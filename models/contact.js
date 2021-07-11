import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  phone: {type: String, required: true },
  first_name: {type: String},
  last_name: {type: String},
  email: {type: String}
});

export default mongoose.model('Contact', ContactSchema);