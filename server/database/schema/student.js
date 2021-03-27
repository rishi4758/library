const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const student = new Schema({
  studentId: Number,
  sname: String,
  fine: { type: Number, default: 0 },
});

module.exports = mongoose.model("student", student);
// CREATE TABLE IF NOT EXISTS STUDENT(id int AUTO_INCREMENT, name
//     VARCHAR(255), fine float(6,2) DEFAULT 0, PRIMARY KEY (id))',
