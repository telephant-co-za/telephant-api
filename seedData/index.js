import contactModel from '../api/contacts/contactModel';
import { contacts } from './contacts';

// deletes all user documents in collection and inserts test data
export async function loadContacts() {
  console.log('load contact Data');
  try {

    await contactModel.deleteMany();
    await contactModel.collection.insertMany(contacts);
    console.info(`${contacts.length} contacts were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load contacts Data: ${err}`);
  }
}