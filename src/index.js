import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import store from './store';
import {Provider} from 'react-redux';
import Main from './views/main';
import Login from './views/login';
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import cookie from 'react-cookies'

export default class MyIndex extends Component {

  render() {
    return (
    	<Provider store={store} className="App" basename="/">
        <Router>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
        </Router>
    	</Provider>
    );
  }
}

ReactDOM.render(<MyIndex />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
serviceWorker.unregister();
