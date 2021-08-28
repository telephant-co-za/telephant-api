import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransactionsSchema = new Schema({
  transactionID: {
    type: String,
    required: [true, "Transaction ID required."],
    min: [7, "A unique string of 7 characters required"],
  },
  accountID: { type: String },
  type: {
    type: String,
    enum: [
      "AIRTIME", //internal
      "INITIAL", //internal
      "DEPOSIT", //internal
      "PAY", //internal
      "TOPUP",
      "FEE",
      "SEND",
      "RECEIVE",
      "TAX",
      "USE",
      "CONVERT", //internal
      "FEE_REVENUE", //internal
      "TAX_ACCOUNT", //internal
    ],
    default: "SEND",
  },
  amount: {
    type: Number,
    min: 0,
  },
  sign: {
    type: Number,
    enum: [1, -1],
  },
  description: { type: String, max: [100, "Description is too long"] },
  dateTime: { type: Date },
});

export default mongoose.model("Transactions", TransactionsSchema);
