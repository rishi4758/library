import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  state = {};

  update() {
    this.setState(this.state);
  }

  render() {
    return (
      <>
        <div id="nav1" className="row d-flex justify-content-center ">
          <div className="logo col-4 mt-4 ">
            <span>LIBRARY MANAGEMENT SYSTEM</span>
          </div>
          <div className=" offset-3 col-5 mt-2">
            <ul>
              <li>
                <Link className="link" to="/" onClick={this.update}>
                  Home
                </Link>
              </li>
              <li>
                <Link className="link" to="/issue" onClick={this.update}>
                  Issue Book
                </Link>
              </li>
              <li>
                <Link className="link" to="/return" onClick={this.update}>
                  Return Book
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Nav;
