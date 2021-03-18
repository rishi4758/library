import React from "react";
import Nav from "./components/Nav/Nav";
import Carousel from "./components/carousel";
import Books from "./components/Books/Books";
import Issue from "./components/Issue/Issue";
import Return from "./components/Return/Return";
import Search from "./components/search/search";
import "./App.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Carousel />
          <Switch>
            <Route path="/" exact strict component={Books} />
            <Route path="/issue" exact strict component={Issue} />
            <Route path="/return" exact strict component={Return} />
            <Route path="/search" exact strict component={Search} />
            <Redirect from="*" to="/" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
