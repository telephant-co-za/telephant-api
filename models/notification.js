import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  date_time: {type: String},
  subject: {type: String, required: true },
  message: {type: String},
  read: {type: Boolean},
  type: {
    type: String,
    enum : ['info','request'],
    default: 'user'},
  owner: {type: String}
});

export default mongoose.model('Notification', NotificationSchema);