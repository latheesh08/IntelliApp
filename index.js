import {
  AppRegistry,
} from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import React, { Component } from "react";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Reducers from './Reducers/MainReducer'
const store = createStore(
  Reducers,
  applyMiddleware(thunk)
)


class MainApp extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Provider store={store}>
            <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => MainApp);
