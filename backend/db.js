const mysql = require("mysql2")

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "test"
})


db.connect(err => {
  if (err) {
    console.log(err)
    return
  }

  console.log("mysql connected")
})

module.exports = db