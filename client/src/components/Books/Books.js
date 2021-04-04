import React from "react";
import { domain } from "../../config";
import "./Books.css";

class Books extends React.Component {
  state = {
    header: (
      <thead id="header">
        <tr>
          <th scope="col">Book Name</th>
          <th scope="col">Author</th>
          <th scope="col">Total Count</th>
          <th scope="col">Semester No</th>
        </tr>
      </thead>
    ),
    books: [],
  };

  async componentDidMount() {
    await fetch(`${domain}/api/getBooks`)
      .then((res) => res.json())
      .then((books) => {
        books.map((el) => {
          if (el.count > 0) {
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
                    <h2>{el.name.toUpperCase()}</h2>
                    <h4 className="row">{el.author}</h4>
                    <h4 className="row"> count: {el.count}</h4>
                    <h4 className="row"> semester:{el.semester}</h4>
                    {/* <tr key={el.id}>
                      <td>{el.name.toUpperCase()}</td>
                      <td>{el.author}</td>
                      <td>{el.count}</td>
                      <td>{el.semester}</td>
                    </tr> */}
                    ,
                  </div>
                </div>,
              ],
            });
          }
          return el;
        });
      });
  }

  render() {
    return (
      <div id="books">
        <span id="heading">AVAILABLE BOOKS</span>

        <div className="container justify-content-center ">
          <div className="row d-flex justify-content-center">
            {this.state.books}
          </div>
        </div>
      </div>
    );
  }
}

export default Books;
