import path, { dirname } from "path";

const fs = require("fs");

const pathfile = "utilities/topics.json";

export default async function handler(req, res) {
  let data = await fs.promises.readFile(pathfile, "utf8");
  //   let maindata = [];
  //   data = JSON.parse(data);
  //   console.log(data);
  res.status(200).json(JSON.parse(data));
}
