const mongoose = require("mongoose");
const Books = require("../database/schema/books");
const Student = require("../database/schema/student");
const Borrow = require("../database/schema/borrow");
const { findByIdAndUpdate } = require("../database/schema/books");
module.exports = (app) => {
  //GET LIST OF ALL THE BOOKS
  app.get("/api/getBooks", async (req, res) => {
    Books.find().exec((err, user) => {
      if (err) {
        res.send({ message: err, status: 500 });
        return;
      }
      if (!user) {
        return res.send({ message: "no data", status: 400 });
      }

      return res.send(user);
    });
  });

  //GET LIST OF BOOKS BY SEMESTER
  app.get("/api/getBooks/:id", (req, res) => {
    console.log(req.params.id, "........id from semester");
    Books.find({ semester: req.params.id }).exec((err, user) => {
      if (err) {
        res.send({ message: err, status: 500 });
        return;
      }
      if (!user) {
        return res.send({ message: "no data", status: 400 });
      }

      return res.send(user);
    });
  }),
    //BORROW A BOOK
    app.post("/api/borrow", async (req, res) => {
      function addDays(date, days) {
        const copy = new Date(Number(date));
        copy.setDate(date.getDate() + days);
        return copy;
      }
      var date = Date.now();
      const a = new Date(Date.now());
      var deadline = addDays(a, 7);

      const s = await new Borrow({
        studentId: req.body.sid,
        bookId: req.body._id,
        date: date,
        deadline: deadline,
      }).save();

      await Books.findByIdAndUpdate(
        { _id: req.body._id },
        { count: req.body.count <= 0 ? 0 : req.body.count - 1 }
      ).exec((err, user) => {
        if (err) {
          console.log(err);
          res.status(500).send("book can not be issued");
        }
        res.status(200).send({ message: "book has been sucessfully issued" });
      });
    });

  //GET ALL THE ISSUED BOOKS BY A STUDENT
  app.get("/api/getIssues/:sid", (req, res) => {
    Borrow.find({ studentId: req.params.sid })
      .populate("bookId")
      .exec((err, user) => {
        res.status(200).send(user);
      });
  });

  //RETURN A BOOK, UPDATE FINE IF ANY
  app.post("/api/return", (req, res) => {
    // console.log(req.body.sid, "------------", req.body);
    Borrow.findOneAndDelete({
      studentId: req.body.sid,
      bookId: req.body.id,
    }).exec((err, result) => {
      console.log(result, "...result from borrrow table");

      Books.findByIdAndUpdate(
        { _id: req.body.id },
        { count: req.body.bookId.count + 1 }
      ).exec((err, result) => {
        res.status(200).send({ message: "book has been sucessfully issued" });
      });
    });
  });
};
