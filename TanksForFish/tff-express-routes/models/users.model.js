"use strict";
const db = require("./db-conn");


function getUserById(id) {
  let sql = "SELECT * FROM users where google_id=?";
  const item = db.get(sql, id);
  return item;
}

function createNewUser(params) {
  let sql = `INSERT INTO users  (google_id, display_name, first_name, last_name, email, role) 
     VALUES (?, ?, ?, ?, ?, ?)`;
  const info = db.run(sql, params);

  return info;
}
function getUserByGoogleId(googleId) {
  const sql = `SELECT * FROM users WHERE google_id = ?`;
  return db.prepare(sql).get(googleId);
}



module.exports = {
  getUserById,
  createNewUser,
  getUserByGoogleId
};