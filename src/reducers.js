/**
 * Root Reducer
 */
import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
// Import Reducers
import app from './modules/App/AppReducer';
import link from './modules/Link/LinkReducer';
import routing from './modules/Router/RouteReducer';
// Combine all reducers into one root reducer
export default combineReducers({
  app,
  link,
  routing,
  form
});
