import mongoose from 'mongoose';

const validateAccountName = accountName => {
  const re = /^[a-z0-9-]{3,16}$/;
  return re.test(accountName);
};

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  type: {
      enum: ['COA', 'GRP', 'USR'],
      type: 'String',
      default: 'USR'},
    accountName: {
      type: String,
      unique: [true],
      required: [true, 'A account name is required.'],
      validate: [validateAccountName, 'The account name can be 3 to 16 characarters. It can contain lowercase letters (a-z), numbers (0-9) or hyphens.  The account name must be universally unique across the whole system.']},
    balance: {type: Number, required: true},
    sign: { type: Boolean },
    owners: {
      type: Array,
      required: true
    },
    description: {
      type: String,
      maxLength: 300
    }
  });

export default mongoose.model('Account', AccountSchema);