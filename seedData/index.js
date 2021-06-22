import contactModel from '../api/contacts/contactModel';
import accountModel from '../api/accounts/accountModel';
import userModel from '../api/users/userModel';
import groupsrightsModel from '../api/groupsrights/groupsrightsModel';

import { contacts } from './contacts';
import { accounts } from './accounts';
import { users } from './users';
import { groupsrights } from './groupsrights';

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

// deletes all account documents in collection and inserts test data
export async function loadAccounts() {
  console.log('Load Accounts collection data.');
  try {
    await accountModel.deleteMany();
    await accountModel.collection.insertMany(accounts);
    console.info(`${accounts.length} Accounts were successfully stored.`);
  } catch (err) {
    console.error(`Failed to load Accounts data: ${err}`);
  }
}

async function loadUsers() {
  try {
    await userModel.deleteMany();
    users.forEach(user => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}

async function loadGroupsRights() {
  try {
    await groupsrightsModel.deleteMany();
    groupsrights.forEach(groupsrights => groupsrightsModel.create(groupsrights));
    console.info(`${groupsrights.length} groups rights were successfully stored.`);
  } catch (err) {
    console.error(`failed to load Groups Rights data: ${err}`);
  }
}


if (process.env.seedDb) {
  loadUsers();
  loadContacts();
  loadAccounts();
  loadGroupsRights();
}