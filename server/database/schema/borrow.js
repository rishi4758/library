const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const borrow = new Schema(
  {
    studentId: {
      type: Number,
      ref: "student",
    },

    bookId: {
      type: Schema.Types.ObjectId,
      ref: "books",
    },

    date: {
      type: Date,
    },
    deadline: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("borrow", borrow);

// borrow: "CREATE TABLE IF NOT EXISTS BORROW(idStudent int,
// idBook int, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, deadline T
// IMESTAMP DEFAULT DATE_ADD(CURRENT_TIMESTAMP(),INTERVAL 7 DAY),\
//                      PRIMARY KEY (idStudent, idBook),\
//                      FOREIGN KEY(idStudent) REFERENCES STUDENT(id),\
//                      FOREIGN KEY(idBook) REFERENCES BOOK(id))"
