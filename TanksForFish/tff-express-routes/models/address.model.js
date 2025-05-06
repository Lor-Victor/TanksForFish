"use strict";

const db = require("./db-conn");

function addAddress(params) {
    const sql = `INSERT INTO address (user_id, street, city, state, country, zip_code)
               VALUES (?, ?, ?, ?, ?, ?);`;
    return db.run(sql, params);
}

function getAddressesByUserId(user_id) {
    const sql = `SELECT * FROM address WHERE user_id = ?;`;
    return db.all(sql, [user_id]);
}

function deleteAddress(a_id) {
    const sql = `DELETE FROM address WHERE a_id = ?;`;
    return db.run(sql, [a_id]);
}
function addressExists(user_id, street, city, state, country, zip_code) {
    const sql = `
      SELECT * FROM address
      WHERE user_id = ? AND street = ? AND city = ? AND state = ? AND country = ? AND zip_code = ?;
    `;
    return db.get(sql, [user_id, street, city, state, country, zip_code]);
}
module.exports = {
    addAddress,
    getAddressesByUserId,
    deleteAddress,
    addressExists
};
