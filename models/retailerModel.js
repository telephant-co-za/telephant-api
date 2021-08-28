import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RetailerSchema = new Schema({
  name: { type: String, unique: true, required: true },
  area: { type: String, required: true },
});

export default mongoose.model("Retailer", RetailerSchema);
