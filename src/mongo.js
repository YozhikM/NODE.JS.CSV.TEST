import mongoose from "mongoose";

export default function initDB() {
  const uri = "mongodb://yozhik:pass@ds211289.mlab.com:11289/hh_jobs";
  mongoose.connect(uri);
  const db = mongoose.connection;
  db.on("error", err => console.log(err));

  db.once("open", () => {
    console.log(`Successfully connected to ${uri}`);
  });

  db.once("disconnected", () => {
    console.log(`Disconnected from ${uri}`);
  });
}
