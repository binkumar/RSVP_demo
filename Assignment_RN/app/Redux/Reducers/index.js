import { combineReducers } from 'redux';

import registration from './registration';
import api from './api_reducer';

export default combineReducers({
  registration,
  api,
});
