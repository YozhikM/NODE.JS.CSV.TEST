import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  ssoid: String,
  ts: String,
  grp: String,
  type: String,
  subtype: String,
  url: String,
  orgid: String,
  formid: String,
  ymdh: String,
  ltpa: String,
  sudirresponse: String
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
