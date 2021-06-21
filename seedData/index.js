import contactModel from '../api/contacts/contactModel';
//import accountModel from '../api/accounts/accountModel';
import userModel from '../api/users/userModel';

import { contacts } from './contacts';
//import { accounts } from './accounts';
import { users } from './users';

// deletes all user documents in collection and inserts test data
async function loadContacts() {
  console.log('Load Contacts collection data.');
  try {
    await contactModel.deleteMany();
    await contactModel.collection.insertMany(contacts);
    console.info(`${contacts.length} contacts were successfully stored.`);
  } catch (err) {
    console.error(`Failed to load Contacts data: ${err}`);
  }
}

// // deletes all account documents in collection and inserts test data
// export async function loadAccounts() {
//   console.log('Load Accounts collection data.');
//   try {

//     await accountModel.deleteMany();
//     await accountModel.collection.insertMany(accounts);
//     console.info(`${contacts.length} Aontacts were successfully stored.`);
//   } catch (err) {
//     console.error(`Failed to load Accounts data: ${err}`);
//   }
// }

async function loadUsers() {
  try {
    console.log("**************");
    await userModel.collection.drop();
    users.forEach(user =>  userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}

if (process.env.seedDb) {
  loadUsers();
  loadContacts();
}