import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './Reducers/index';
import apiMiddleware from './middleware/api';

const middlewares = [thunk, apiMiddleware];

if (__DEV__) {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(...middlewares)),
);

export default store;
