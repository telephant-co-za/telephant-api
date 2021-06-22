import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GroupsRightsSchema = new Schema({
  accountID: { type: String },
  username: { type: String },
  rights: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
    default: 0
  }
});

export default mongoose.model('GroupsRights', GroupsRightsSchema);