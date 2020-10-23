import { API_ACTION_TYPE } from './Helper/types';
import { actionMappingForApi } from '../utilities/index';
import { generateRoute, requestHeaders } from './Helper/routes';
import { convertObjectToLowerCaseKeys } from '../utilities';

const TIMEOUT = 15 * 1000;

export const fetchSuccess = (response, actionName) => ({
  type: actionName,
  payload: convertObjectToLowerCaseKeys(response),
});

export const fetchFailure = (error, actionName) => ({
  type: actionName,
  payload: error,
});

export const fetchContent = (key, data) => (dispatch, getState) => {
  if (!key) {
    return null;
  }
  const actionsForRoute = actionMappingForApi(key);
  const {
    inProgressActionName,
    failureActionName,
    successActionName,
  } = actionsForRoute;
  dispatch({ type: inProgressActionName });

  return dispatch({
    type: API_ACTION_TYPE.API,
    payload: {
      url: generateRoute(key, data),
      data: null,
      onSuccess: response => fetchSuccess(response, successActionName),
      onFailure: error => fetchFailure(error, failureActionName),
      label: inProgressActionName,
      headers: requestHeaders(),
      method: 'GET',
      timeout: TIMEOUT,
    },
  });
};
