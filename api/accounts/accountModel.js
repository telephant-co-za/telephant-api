import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  type: ['COA', 'GRP', 'USR'],
  name: { type: String, required: true},
  balance: {type: Number, required: true},
  sign: { type: Boolean }
});

export default mongoose.model('Account', AccountSchema);