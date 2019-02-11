import express from "express";
import initDB from "./mongo";
// import parseCSV from "./parser";
import Event from "./schema";

initDB();
// parseCSV();

const app = express();

app.get("/lasthour", (req, res) => {
  const lastHour = Date.now() / 1000 - 60 * 60;
  Event.find(
    {
      ts: { $lte: lastHour }
    },
    (err, data) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(data));
    }
  );
});

app.get("/notsended", (req, res) => {
  Event.find(
    {
      grp: /dszn_/i,
      subtype: { $ne: "send" }
    },
    (err, data) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(data));
    }
  );
});

app.listen(3000);
