// imports

import express from "express";
import asyncHandler from "express-async-handler";

const createError = require("http-errors");
const router = express.Router();

// models
import Transaction from "../../../models/transactionModel";
import Account from "../../../models/accountModel";
import Notification from "../../../models/notificationModel";
import Contact from "../../../models/contactModel";

// custom functions
import wrongPath from "../../../functions/wrongPath";

async function getAccountID(account_name) {
  const accountIDpromise = Account.find({ accountName: account_name })
    .select("_id")
    .limit(1);

  const accountID = await accountIDpromise;
  return accountID[0]._id;
}

// ROUTER
router

  // GET return list of transactions
  .get(
    "/",
    asyncHandler(async (req, res, next) => {
      const accountID = await getAccountID(res.locals.account_name);

      let { page = 1, limit = 10 } = req.query;
      [page, limit] = [+page, +limit];

      try {
        const transactionsPromise = Transaction.find({ accountID: accountID })
          .limit(limit)
          .skip((page - 1) * limit)
          .select("-_id -__v")
          .sort("dateTime")
          .lean();

        var transactions = await transactionsPromise;
        const totalDocuments = await Transaction.find({
          accountID: accountID,
        }).countDocuments();

        // if no results return a message
        if (totalDocuments == 0) {
          const err = createError(404, "No transactions found.");
          return next(err);
        }

        // Will convert the amount into the right sign for the users perspective
        for (const num in transactions) {
          var amount = transactions[num].amount;
          var sign2 = transactions[num].sign;

          // reverse the sign
          transactions[num].amount = amount * (sign2 * -1);

          // take out sign from the user output
          transactions[num].sign = undefined;

          // add in the id for the react grid component
          // note: don't want the mongo id revealed
          transactions[num].id = parseInt(num) + 1;
        }

        const returnObject = {
          page: page,
          total_pages: Math.ceil(totalDocuments / limit),
          total_results: totalDocuments,
          results: transactions,
        };

        res.locals.output = returnObject;
        next();
      } catch (error) {
        const err = createError(500, error);
        return next(err);
      }
    })
  )

  // GET return details of a specific transaction
  // GET return details of a transaction
  .get(
    "/:TransactionID",
    asyncHandler(async (req, res, next) => {
      const accountID = await getAccountID(res.locals.account_name);

      const TransactionID = req.params.TransactionID;

      // Pre-checks complete...

      try {
        const transactions = await Transaction.find({
          transactionID: TransactionID,
          accountID: accountID,
        })
          .select("-_id -__v")
          .sort("dateTime");

        const notificationObject = await Notification.find({
          link: TransactionID,
          owner: res.locals.account_name
        });

        // Will convert the amount into the right sign for the users perspective
        for (const num in transactions) {
          var amount = transactions[num].amount;
          var sign2 = transactions[num].sign;

          // reverse the sign
          transactions[num].amount = amount * (sign2 * -1);

          // take out sign from the user output
          transactions[num].sign = undefined;
        }

        if (transactions.length > 0) {

          let total = 0;

          for(var i in transactions ) {
            total = total + transactions[i].amount;
          }

          let linesObject = [];
          for(var j in transactions) {
            let lines = {
              type: transactions[j].type,
              accountID: transactions[j].accountID,
              amount: transactions[j].amount,
              description: transactions[j].description             
            };

            linesObject.push(lines);
          }

          let transactionObject = {
            header: {
              transactionID: transactions[0].transactionID,
              dateTime: transactions[0].dateTime.toString(),
              total: total,
            },
            lines: linesObject,
            notification: notificationObject
          };
          res.locals.output = transactionObject;
          next();
        } else {
          const err = createError(
            404,
            "Could not find this Transaction ID in your transaction history."
          );
          next(err);
        }
      } catch (error) {
        const err = createError(500, error);
        next(err);
      }
    })
  )

  // UNFOUND METHODS
  .all("/*", wrongPath);

export default router;
