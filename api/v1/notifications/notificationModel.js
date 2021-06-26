import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true }
});

export default mongoose.model('Notification', NotificationSchema);