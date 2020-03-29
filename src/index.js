import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import store from "./store/store";
import { Provider } from "react-redux";
import Main from "./views/main";
import Login from "./views/login";
import LogOut from "./views/logout";
import Dashboard from "./views/dashboard";
import UserAdmin from "./views/useradmin";
import VideoStore from "./views/videostore";

import { BrowserRouter as Router, Route } from "react-router-dom";

export default class MyIndex extends Component {
  render() {
    return (
      <Provider store={store} className="App" basename="/">
        <Router>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={LogOut} />
          <Route exact path="/useradmin" component={UserAdmin} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/videostore" component={VideoStore} />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<MyIndex />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
serviceWorker.unregister();
