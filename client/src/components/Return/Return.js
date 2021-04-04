import React from "react";
import "./Return.css";
import { domain } from "../../config";
class Return extends React.Component {
  state = {
    header: <thead></thead>,
    books: [],
    name: "",
  };

  fetchData = (e) => {
    e.preventDefault();
    var sid = document.getElementById("sid").value;
    this.setState({
      header: (
        <thead id="header">
          <tr>
            <th scope="col">Book Name</th>
            <th scope="col">Author</th>

            <th scope="col">Issue Date</th>
            <th scope="col">Return Deadline</th>
            <th scope="col"></th>
          </tr>
        </thead>
      ),
      books: [],
    });

    fetch(`${domain}/api/getIssues/${sid}`)
      .then((res) => res.json())
      .then((books) => {
        if (books.length > 0) {
          this.setState({
            ...this.state,
            name: `Books Issued By student are:`,
          });
          books.forEach((el) =>
            this.setState({
              books: [
                ...this.state.books,

                <div key={el.id} className="  col-3  ml-4 card">
                  <img
                    className="cardImg"
                    src={`./images/book.png`}
                    alt="videolevels-img"
                  />
                  <div key={el.bookId._id} className="data">
                    <h4>{el.bookId.name.toUpperCase()}</h4>
                    <h5 className="row">{el.bookId.author}</h5>
                    <h5 className="row"> Issued: {el.date}</h5>
                    <h5 className="row"> deadline:{el.deadline}</h5>

                    <button
                      className="btn btn-primary button"
                      onClick={() => this.returnIt(el)}
                    >
                      Return
                    </button>
                  </div>
                </div>,
              ],
            })
          );
        } else {
          this.setState({ header: [] });
          this.setState({
            ...this.state,
            name: "No Books Issued By The Student",
          });
        }
      });
  };

  returnIt = (el) => {
    fetch(`${domain}/api/return`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...el,
        id: el.bookId._id,
        sid: parseInt(document.getElementById("sid").value),
      }),
    }).then((res) => {
      window.alert(`${el.bookId.name} has beeen returned Thank You!`);
      this.props.history.push("/form");
    });
  };

  render() {
    return (
      <>
        <span className="heading ">
          Please Enter the student school id to return the book:
        </span>
        <div id="return" className="text-center">
          <form onSubmit={this.fetchData}>
            <label className=" mt-3">Enter student Id</label>
            <input
              className="form-control sel"
              type="number"
              placeholder="0 - 10"
              id="sid"
              min="1"
              required
            ></input>
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </form>
          <br />
        </div>
        <div className="container justify-content-center ">
          <div className="row d-flex justify-content-center">
            {this.state.books}
          </div>
        </div>
      </>
    );
  }
}

export default Return;
