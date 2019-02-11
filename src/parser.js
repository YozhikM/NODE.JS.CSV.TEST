import path from "path";
import fs from "fs";
import parse from "csv-parse";

import Event from "./schema";

export default function parseCSV() {
  const output = [];
  const file = path.join(__dirname, "/../test_case.csv");

  // Create the parser
  const parser = parse({
    delimiter: ";"
  });

  fs.createReadStream(file)
    .pipe(parser)
    .on("data", data => {
      const [
        ssoid,
        ts,
        grp,
        type,
        subtype,
        url,
        orgid,
        formid,
        ymdh,
        ltpa,
        sudirresponse
      ] = data;
      const newEvent = new Event({
        ssoid,
        ts,
        grp,
        type,
        subtype,
        url,
        orgid,
        formid,
        ymdh,
        ltpa,
        sudirresponse
      });

      Event.insertMany(newEvent, err => {
        if (err) console.error(err);
      });
    })
    .on("error", error => console.log(error))
    .on("end", () => {
      console.log(`Done with ${output.length} length`);
    });
}
