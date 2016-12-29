/**
 * Root Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

// Import Routes
import createRoutes from './modules/Router';
import {
    syncHistoryWithStore
} from 'react-router-redux';


// Base stylesheet
require('./App.css');

import AppContainer from './App' 

export default function App(props) {
  const {store} = props;
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
        return state.get('routing').toJS();
    }
  });

  let routes = createRoutes(store);
  return (
    <Provider store={store}>
      <Router history={history} routes={routes} />

    </Provider>
  );
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
};
