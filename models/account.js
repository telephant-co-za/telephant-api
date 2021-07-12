import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  type: ['COA', 'GRP', 'USR'],
  accountName: { type: String, required: true},
  balance: {type: Number, required: true},
  sign: { type: Boolean },
  owners: {
    type: Array,
    required: true
  }
});

export default mongoose.model('Account', AccountSchema);