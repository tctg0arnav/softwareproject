import path from "path";

const fs = require("fs");
const pathfile = "utilities/array_ques.json";

export default async function handler(req, res) {
  let data = await fs.promises.readFile(pathfile, "utf8");

  res.status(200).json(JSON.parse(data));
}
