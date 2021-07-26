import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  date_time: {
    type: Date,
    required: true,
    default: Date.now()
  },
  subject: {
    type: String, 
    required: true,
    maxlength: 160  // make length for SMS integration
                    // https://www.twilio.com/docs/glossary/what-sms-character-limit#:~:text=The%20character%20limit%20for%20a,are%20limited%20to%2070%20characters.
  },
  message: {
    type: String,
    required: true,
    maxlength: 200
  },
  read: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    enum : ['INFO','REQUEST'],
    default: 'INFO'
  },
  owner: {
    type: String
  },
  link: {
    type: String,  // Will be used to provide a link to more info about the notifcation
                  // Full URL will be gerated by the client 

  }
},
{ timestamps: true }
);

export default mongoose.model('Notification', NotificationSchema);