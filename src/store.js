/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import DevTools from './modules/App/components/DevTools';
import rootReducer from './reducers';
import api from './middleware/api';
import {LOCAL_STORAGE_DB} from './constants/resources'

export function configureStore(initialState = {}) {
  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(thunk, api),
  ];
  
  if (process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering on client and during development.
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
  }
  const store = createStore(rootReducer, fromJS(initialState), compose(...enhancers));

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  store.subscribe(
    () => localStorage.setItem(LOCAL_STORAGE_DB, JSON.stringify(store.getState().toJS()))
  )
  
  return store;
}
