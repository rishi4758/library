import React from "react";
import "./Issue.css";
import { domain } from "../../config";
class Books extends React.Component {
  state = {
    header: <thead></thead>,
    books: [],
  };

  fetchData = (e) => {
    e.preventDefault();
    var sem = document.getElementById("select").value;
    this.setState({
      header: (
        <thead id="header">
          <tr>
            <th scope="col">Book Name</th>
            <th scope="col">Author</th>
            <th scope="col">Semester No</th>
            <th scope="col"></th>
          </tr>
        </thead>
      ),
      books: [],
    });

    fetch(`${domain}/api/getBooks/${sem}`)
      .then((res) => res.json())
      .then((books) =>
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
                <div key={el.id} className="data">
                  <h4>{el.name.toUpperCase()}</h4>
                  <h5 className="row">{el.author}</h5>
                  <h5 className="row"> count: {el.count}</h5>
                  <h5 className="row"> semester:{el.semester}</h5>
                  {/* <tr key={el.id}>
                      <td>{el.name.toUpperCase()}</td>
                      <td>{el.author}</td>
                      <td>{el.count}</td>
                      <td>{el.semester}</td>
                    </tr> */}
                  <button
                    className="btn btn-primary button"
                    onClick={() => this.issueIt(el)}
                  >
                    Issue
                  </button>
                </div>
              </div>,
            ],
          })
        )
      );
  };

  componentDidMount() {
    if (document.getElementById("id").value === "")
      document.getElementById("select").disabled = true;
    else document.getElementById("select").disabled = false;
  }

  issueIt = (el) => {
    fetch(`${domain}/api/borrow`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...el,
        sid: parseInt(document.getElementById("id").value),
      }),
    }).then((res) => {
      window.alert(`${el.name} has beeen issued`);
      this.props.history.push("/form");
    });
  };

  render() {
    return (
      <>
        <span className="heading ">
          Please Enter the student school id to issue a new book:
        </span>
        <div id="issue" className=" container ">
          <form onSubmit={this.fetchData} className="justify-content-center">
            <label className="label mt-3">Enter student Id</label>
            <input
              className="form-control sel"
              type="number"
              placeholder="1 - 10"
              id="id"
              min="1"
              onChange={this.componentDidMount}
              required
            ></input>
            <label className="label">Select Semester </label>
            <select className="form-control sel" id="select">
              <option disabled>Select Semester</option>
              <option value="1">1st Sem</option>
              <option value="2">2nd Sem</option>
              <option value="3">3rd Sem</option>
              <option value="4">4th Sem</option>
              <option value="5">5th Sem</option>
              <option value="6">6th Sem</option>
            </select>
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </form>
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

export default Books;
