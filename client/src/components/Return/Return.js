import React from "react";
import "./Return.css";

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
            <th scope="col">Semester No</th>
            <th scope="col">Issue Date</th>
            <th scope="col">Return Deadline</th>
            <th scope="col"></th>
          </tr>
        </thead>
      ),
      books: [],
    });

    fetch(`/api/getIssues/${sid}`)
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
                <tr key={el.bookId._id}>
                  <td>{el.bookId.name.toUpperCase()}</td>
                  <td>{el.bookId.author}</td>
                  <td>{el.semester}</td>
                  <td>{el.date}</td>
                  <td>{el.deadline}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => this.returnIt(el)}
                    >
                      Return
                    </button>
                  </td>
                </tr>,
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
    fetch("/api/return", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...el,
        id: el.bookId._id,
        sid: parseInt(document.getElementById("sid").value),
      }),
    }).then((res) => {
      console.log(res);
      window.alert(`${el.bookId.name} has beeen returned Thank You!`);
      this.props.history.push("/form");
    });
  };

  render() {
    return (
      <div id="return" className="text-center">
        <form onSubmit={this.fetchData}>
          <label>Enter student Id</label>
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
        {this.state.name}
        <table id="rResults" className="table table-hover">
          {this.state.header}
          <tbody>{this.state.books}</tbody>
        </table>
      </div>
    );
  }
}

export default Return;
