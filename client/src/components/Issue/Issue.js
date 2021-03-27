import React from "react";
import "./Issue.css";

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

    fetch(`/api/getBooks/${sem}`)
      .then((res) => res.json())
      .then((books) =>
        books.forEach((el) =>
          this.setState({
            books: [
              ...this.state.books,
              <tr key={el._id}>
                <td>{el.name.toUpperCase()}</td>
                <td>{el.author}</td>
                <td>{el.semester}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.issueIt(el)}
                  >
                    Issue
                  </button>
                </td>
              </tr>,
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
    fetch("/api/borrow", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...el,
        sid: parseInt(document.getElementById("id").value),
      }),
    }).then((res) => {
      console.log(res);
      window.alert(`${el.name} has beeen issued`);
      this.props.history.push("/form");
    });
  };

  render() {
    return (
      <div id="issue" className="text-center">
        <form onSubmit={this.fetchData}>
          <label>Enter student Id </label>
          <input
            className="form-control sel"
            type="number"
            placeholder="1 - 10"
            id="id"
            min="1"
            onChange={this.componentDidMount}
            required
          ></input>
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
        <table id="results" className="table table-hover">
          {this.state.header}
          <tbody>{this.state.books}</tbody>
        </table>
      </div>
    );
  }
}

export default Books;
