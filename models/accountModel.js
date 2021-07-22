import mongoose from 'mongoose';

const validateAccountName = accountName => {
  const re = /^[a-z0-9-]{3,16}$/;
  return re.test(accountName);
};

const validateBalance = balance => {
  if (balance >= 0) {return true} else {return false}
};

const AccountSchema = new mongoose.Schema({
    type: {
      enum: ['COA', 'GRP', 'USR'],
      type: String,
      default: 'USR'},
    accountName: {
      type: String,
      unique: [true],
      required: [true, 'A account name is required.'],
      validate: [validateAccountName, 'The account name can be 3 to 16 characarters. It can contain lowercase letters (a-z), numbers (0-9) or hyphens.  The account name must be universally unique across the whole system.']
    },
    balance: 
    {
      type: Number, 
      required: true,
      validate: [validateBalance, 'Balance must be equal to or greater than zero.']
    },
    sign: { 
      type: Number,
      enum: [-1,1]
     },
    owners: {
      type: Array
    },
    description: {
      type: String,
      maxLength: 300
    },
    group: {
      type: String,
      enum: ['asset', 'liability', 'owners-equity']
    },
    businessType: {
      string: ['private', 'public', 'ngo', 'gov'],
      type: String
    },
    verified: {
      type: Boolean
    }
  });

export default mongoose.model('Account', AccountSchema);