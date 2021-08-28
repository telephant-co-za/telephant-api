import mongoose from "mongoose";
require("mongoose-type-email");

const validateTelephoneNumber = (telephoneNumber) => {
  const re = /^(27)[0-9]{9}$/;
  return re.test(telephoneNumber);
};

const validateName = (name) => {
  const re = /^[a-zA-Z]*$/;
  return re.test(name);
};

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  telephoneNumber: {
    type: String,
    required: [true, "A telephone number is required."],
    validate: [
      validateTelephoneNumber,
      "The telephone number does not conform to the South African format (27XXXXXXXXX).",
    ],
  },
  firstName: {
    type: String,
    maxlength: 30,
    validate: [validateName, "You can only use alpha characters in a name."],
  },
  lastName: {
    type: String,
    maxlength: 30,
    validate: [validateName, "You can only use alpha characters in a name."],
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: false,
  },
  owner: {
    type: String,
  },
});

export default mongoose.model("Contact", ContactSchema);
