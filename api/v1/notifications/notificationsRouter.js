// imports

import express from "express";
import asyncHandler from "express-async-handler";

const createError = require("http-errors");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;

// models
import Notification from "../../../models/notificationModel";

// custom functions
import wrongPath from "../../../functions/wrongPath";

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

// ROUTER

router
  // GET return list of notifications
  .get(
    "/",
    asyncHandler(async (req, res, next) => {
      let { page = 1, limit = 10 } = req.query;
      [page, limit] = [+page, +limit];

      try {
        const notificationsPromise = Notification.find({
          owner: res.locals.account_name,
        })
          .limit(limit)
          .skip((page - 1) * limit);

        const notifications = await notificationsPromise;
        const totalDocuments = await Notification.find({
          owner: res.locals.account_name,
        }).countDocuments();

        // if no results return a message
        if (totalDocuments == 0) {
          const err = createError(400, "No notifications found.");
          return next(err);
        }

        const returnObject = {
          page: page,
          total_pages: Math.ceil(totalDocuments / limit),
          total_results: totalDocuments,
          results: notifications,
        };

        res.locals.output = returnObject;
        next();
      } catch (error) {
        const err = createError(500, error);
        return next(err);
      }
    })
  )

  // GET a count
  .get(
    "/:NotificationID",
    asyncHandler(async (req, res, next) => {
      // want action to be specified in the path not as a query for use in the react app
      if (req.params.NotificationID === "count") {
        try {
          const read = await Notification.count({
            owner: res.locals.account_name,
            read: true,
          });
          const unread = await Notification.count({
            owner: res.locals.account_name,
            read: false,
          });
          const total = await Notification.count({
            owner: res.locals.account_name,
          });

          const returnObject = {
            read: read,
            unread: unread,
            total: total,
          };

          res.locals.output = returnObject;
          next();
        } catch (error) {
          const err = createError(500, error);
          return next(err);
        }
      }

      // Look up individual notifcation

      // isValidObjectId
      if (!isValidObjectId(req.params.NotificationID)) {
        const err = createError(
          400,
          "The Notification ID provided is not valid."
        );
        return next(err);
      }

      // Check notification exists
      const CheckExists = await Notification.find({
        owner: res.locals.account_name,
        _id: req.params.NotificationID,
      });

      if (!CheckExists || CheckExists == 0) {
        const err = createError(404, "The Notification ID could not be found.");
        return next(err);
      }

      try {
        const returnObject = await Notification.findOne({
          owner: res.locals.account_name,
          _id: req.params.NotificationID,
        });

        res.locals.output = returnObject;
        next();
      } catch (error) {
        const err = createError(500, error);
        return next(err);
      }
    })
  )

  // POST Mark all unread notifications as read
  .post("/", (req, res, next) => {
    Notification.updateMany(
      { owner: res.locals.account_name, read: false },
      { read: true },
      function (error, docs) {
        if (error) {
          const err = createError(500, error);
          return next(err);
        } else {
          let message = {
            message: docs.n + " notifications were marked as read.",
          };
          res.locals.output = message;
          next();
        }
      }
    );
  })

  // POST Mark a specific notification as read
  .post(
    "/:NotificationID",
    asyncHandler(async (req, res, next) => {
      // isValidObjectId
      if (!isValidObjectId(req.params.NotificationID)) {
        const err = createError(
          400,
          "The Notification ID provided is not valid."
        );
        return next(err);
      }

      // Check notification exists
      const CheckExists = await Notification.find({
        owner: res.locals.account_name,
        _id: req.params.NotificationID,
      });

      if (!CheckExists || CheckExists == 0) {
        const err = createError(404, "The Notification ID could not be found.");
        return next(err);
      }

      Notification.updateOne(
        {
          owner: res.locals.account_name,
          read: false,
          _id: req.params.NotificationID,
        },
        { read: true },
        function (error, docs) {
          if (error) {
            const err = createError(500, error);
            return next(err);
          } else {
            let message = { message: "The notification was marked as read." };
            res.locals.output = message;
            next();
          }
        }
      );
    })
  )

  .all("/*", wrongPath);

export default router;
