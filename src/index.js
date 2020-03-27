import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import store from './store';
import {Provider} from 'react-redux';
import App from './App';

export default class MyIndex extends Component {
  render() {
    return (
    	<Provider store={store} className="App" basename="/">
         <App />
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
