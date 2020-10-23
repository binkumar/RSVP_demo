import { Platform } from 'react-native';
import axios from 'axios';

import { API_ACTION_TYPE } from '../Actions/Helper/types';
import { accessDenied, apiError, apiStart, apiEnd } from '../Actions/api_action';
import { errorCodes } from './errorCodes';

axios.defaults.headers.common['User-Agent'] =
  Platform.OS === 'ios' ? 'iPhone' : 'Android';

const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);

  if (action.type !== API_ACTION_TYPE.API) {
    return;
  }

  const {
    url,
    data,
    onSuccess,
    onFailure,
    label,
    headers,
    method = 'GET',
    timeout = 60 * 1000,
  } = action.payload;
  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

  if (label) {
    dispatch(apiStart(label));
  }
  return axios({
    url,
    method,
    headers,
    [dataOrParams]: data,
    timeout,
  })
    .then(response => {
      if (
        response.status >= errorCodes.BAD_REQUEST ||
        response.status === errorCodes.NOT_MODIFIED
      ) {
        dispatch(apiError(response));
        dispatch(onFailure(response));
      } else {
        dispatch(onSuccess(response));
      }
    })
    .catch(error => {
      dispatch(apiError(error));
      dispatch(onFailure(error));

      if (
        error.response &&
        error.response.status === errorCodes.ACCESS_DENIED
      ) {
        dispatch(accessDenied(window.location.pathname));
      }
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label));
      }
    });
};

export default apiMiddleware;
