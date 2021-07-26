import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TransactionsSchema = new Schema({
    transactionID: {
    type: String,
    required: [true, 'Transaction ID required.'],
    min: [7, 'A unique string of 7 characters required']
  },
  accountID: { type: String },
  type: {
    type: String,
    enum: [
      'AIRTIME', 
      'INITIAL', 
      'DEPOSIT', 
      'PAY', 
      'TOPUP', 
      'FEE', 
      'SEND', 
      'RECEIVE', 
      'TAX', 
      'CONVERT',
      'FEE_REVENUE',
      'TAX_ACCOUNT'
    ],
    default: 'SEND'
  },
  amount: 
    {
      type: Number,
      min: 0
    },
  sign: {
    type: Number,
    enum: [1, -1]
  }, 
  description: 
    { type: String,
      max: [100, 'Description is too long']
  },
  dateTime: { type: Date }
});

export default mongoose.model('Transactions', TransactionsSchema);