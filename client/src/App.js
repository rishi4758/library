import React from "react";

import Books from "./components/Books/Books";
import Issue from "./components/Issue/Issue";
import Return from "./components/Return/Return";

import Form from "./components/Form/index";
import Register from "./components/Form/register";
import AuthCheck from "./hoc/authCheck";
import "./App.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" strict component={Form} />
            <Route path="/form" exact strict component={AuthCheck(Books)} />
            <Route path="/issue" exact strict component={AuthCheck(Issue)} />
            <Route path="/return" exact strict component={AuthCheck(Return)} />
            <Route path="/register" exact strict component={Register} />
            <Redirect from="*" to="/" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
