const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const books = new Schema({
  name: String,
  author: String,
  semester: Number,
  count: Number,
});

module.exports = mongoose.model("books", books);

// books: 'CREATE TABLE IF NOT EXISTS BOOK(id int AUTO_INCREMENT, name VARCHAR(255),
// author VARCHAR(255), semester int(1), count int, PRIMARY KEY (id))',
