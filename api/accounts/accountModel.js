import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  accountCode: { type: String, unique: true, required: true},
  accountType: ['COA', 'GRP', 'USR'],
  balance: {type: Number, required: true},
  sign: ['+', '-']

});

export default mongoose.model('Account', AccountSchema);