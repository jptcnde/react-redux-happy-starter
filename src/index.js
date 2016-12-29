/**
 * Client entry point
 */
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { configureStore } from './store'
import { fromJS } from 'immutable'
import {LOCAL_STORAGE_DB} from './constants/resources'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Initialize store
// get data from local storage 
const store = configureStore(fromJS(JSON.parse(localStorage.getItem(LOCAL_STORAGE_DB)) || {}));

// work around for annoying warning for markup rendering
const MOUNT_NODE = document.getElementById('root');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
console.log(process.env)
let renderApp = (App) => {
  render(
    <AppContainer>
      <MuiThemeProvider>
        <App store={store} />
      </MuiThemeProvider>
    </AppContainer>,
    MOUNT_NODE
  );
}

// For hot reloading of react components
if (module.hot) {

  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    // const NextApp = require('./App').default; // eslint-disable-line global-require
    // render(
    //   <AppContainer>
    //     <NextApp store={store} />
    //   </AppContainer>,
    //   mountApp
    // );
    setTimeout(()=> {
      unmountComponentAtNode(MOUNT_NODE);
      renderApp(require('./App').default);
    })
  });
}

renderApp(require('./App').default);