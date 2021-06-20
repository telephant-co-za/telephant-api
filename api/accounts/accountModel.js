import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  accountCode: { type: String, unique: true, required: true},
  accountType: ['COA', 'GRP', 'USR'],
  balance: {type: Number, required: true},
  sign: ['+', '-']

});

export default mongoose.model('Account', AccountSchema);

// ========================================================

// Schema Decisions:

// Note some aspects of the schema are not revealed to the public API and therefore not documented
// in developer documentation

// accountCode: must be of nature that fits in the bank reference field
// This is so that automated scripts can pick the number from a bank deposits, credit card deposits,
// cash deposits - this will happen via a web hook

// accountType: 
// COA: means chart of account - this is an internal account that is relevant to the business
// The COA of accounts ensure that the allocation of funds is accurately represented
// Also integration with a 3rd party accounting system will be possible later

// GRP: means a group account
// This type of account is for use by businesses, NPOs, charity orgs, governement etc
// The unique id for these GRP accounts will be different to normal user accounts

// USR: means a user account
// This type of account is for use by a single user with a suitable south african mobile number

// the balances in this collection with their relevant signs will balance to ZERO exactly
// this is a trial balance - and will be used to identify issues on scheduled basis if not balanced

// sign: is included because it indicates a DR or CR but depends on the perspective (view, form, report)
// This will become relevant when writing auditing, verification and admin functionality

