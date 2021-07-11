import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TransactionsSchema = new Schema({
  accountID: { type: String },
  type: {
    type: String,
    enum: ['SEND', 'RECEIVE'],
    default: 'SEND'
  },
  amount: Number,
  sign: Boolean,
  from: { type: String },
  dateTime: { type: String }
});

export default mongoose.model('Transactions', TransactionsSchema);