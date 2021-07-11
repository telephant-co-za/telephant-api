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

AccountSchema.statics.checkOwnership = async function (account_id, username) {

  const check = await this.find({ _id: account_id, owners: username }).countDocuments();

  console.log(check);
  
  if (check == 1)
  {
    return true;
  }
  else
  {
    return false;
  }
};

AccountSchema.statics.checkValidAccount = async function(account_id) {

  const check = await this.findById(account_id).countDocuments();

  if (check == 1)
  {
    return true;
  }
  else
  {
    return false;
  }
};

export default mongoose.model('Account', AccountSchema);