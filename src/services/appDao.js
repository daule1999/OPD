var sqlite3 = require('sqlite3').verbose();
var db;

function createDb() {
  console.log("creating db.......");
  db = new sqlite3.Database('database.sqlite3', () => {
    console.log("db created")
  });
  return db;
}
function createTable() {
  console.log("createTable AllPatient");
  db.run("CREATE TABLE IF NOT EXISTS Patient (info TEXT)", insertRows);
}

function insertRows() {
  console.log("insertRows Ipsum i");
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");

  for (var i = 0; i < 10; i++) {
    stmt.run("Ipsum " + i);
  }

  stmt.finalize(readAllRows);
}

function readAllRows() {
  console.log("readAllRows lorem");
  db.all("SELECT rowid AS id, info FROM lorem", function (err, rows) {
    rows.forEach(function (row) {
      console.log(row.id + ": " + row.info);
    });
    closeDb();
  });
}

function closeDb() {
  console.log("closeDb");
  db.close();
}

function runChainExample() {
  createDb();
}

runChainExample();