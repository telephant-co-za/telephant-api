import accountModel from '../../models/accountModel';
import contactModel from '../../models/contactModel';
import notificationsModel from '../../models/notificationModel';
import retailersModel from '../../models/retailerModel'
import transactionsModel from '../../models/transactionModel';
import userModel from '../../models/userModel';

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
    accounts.forEach(account => accountModel.create(account));
    console.info(`${accounts.length} Accounts were successfully stored.`);
  } catch (err) {
    console.error(`Failed to load Accounts data: ${err}`);
  }
}

async function loadContacts() {
  console.log('Load Contacts collection data.');
  try {
    await contactModel.deleteMany();
    contacts.forEach(contacts => contactModel.create(contacts));
    console.info(`${contacts.length} contacts were successfully stored.`);
  } catch (err) {
    console.error(`Failed to load Contacts data: ${err}`);
  }
}

async function loadNotifications() {
  try {
    await notificationsModel.deleteMany();
    notifications.forEach(notifications => notificationsModel.create(notifications));
    console.info(`${notifications.length} notifications were successfully stored.`);
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