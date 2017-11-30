import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './containers/App';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);

// const addLoggingToDispatch = (store) => {
//   const rawDispatch = store.dispatch;
//   return (action) => {
//     console.group(action.type);
//     console.log('prev state', store.getState());
//     console.log('action', action);
//     const returnValue = rawDispatch(action);
//     console.log('next state', store.getState());
//     console.groupEnd(action.type);
//     return returnValue;
//   };
// };
// store.dispatch = addLoggingToDispatch(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
