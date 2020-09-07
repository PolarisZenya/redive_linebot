const sqlite = require("../util/sqlite");
const path = require("path");

module.exports = async () => {
  await sqlite.open(path.join(process.env.PROJECT_PATH, process.env.PRINCESS_SQLITE_PATH));

  var createStatment = 'CREATE TABLE IF NOT EXISTS "Inventory" (';
  createStatment += '"No"           INTEGER PRIMARY KEY AUTOINCREMENT,';
  createStatment += '"userId"       TEXT NOT NULL,';
  createStatment += '"itemId"       INTEGER NOT NULL,';
  createStatment += '"itemAmount"   INTEGER NOT NULL DEFAULT 1,';
  createStatment += '"createTS"     TEXT NOT NULL';
  createStatment += ");";

  return sqlite.run(createStatment);
};
