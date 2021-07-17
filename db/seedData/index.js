import accountModel from '../../models/account';
import contactModel from '../../models/contact';
import notificationsModel from '../../models/notification';
import retailersModel from '../../models/retailer'
import transactionsModel from '../../models/transaction';
import userModel from '../../models/user';

import { accounts } from './accounts';
import { contacts } from './contacts';
import { notifications } from './notifications';
import { retailers } from './retailers';
import { transactions } from './transactions';
import { users } from './users';

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

async function loadNotifications() {
  try {
    await notificationsModel.deleteMany();
    notifications.forEach(notifications => notificationsModel.create(notifications));
    console.info(`${transactions.length} notifications were successfully stored.`);
  } catch (err) {
    console.error(`failed to load Notifcations data: ${err}`);
  }
}

async function loadRetailers() {
  try {
    await retailersModel.deleteMany();
    retailers.forEach(retailers => retailersModel.create(retailers));
    console.info(`${retailers.length} retailers were successfully stored.`);
  } catch (err) {
    console.error(`failed to load Retailers data: ${err}`);
  }
}

async function loadTransactions() {
  try {
    await transactionsModel.deleteMany();
    transactions.forEach(transactions => transactionsModel.create(transactions));
    console.info(`${transactions.length} transactions were successfully stored.`);
  } catch (err) {
    console.error(`failed to load Transactions data: ${err}`);
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

if (process.env.seedDb) {
  loadAccounts();
  loadContacts();
  loadNotifications();
  loadRetailers();
  loadTransactions();
  loadUsers();
}