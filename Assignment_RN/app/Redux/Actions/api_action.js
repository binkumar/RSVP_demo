import {API_ACTION_TYPE} from './Helper/types';

export const apiStart = label => ({
  type: API_ACTION_TYPE.API_START,
  payload: label,
});

export const apiEnd = label => ({
  type: API_ACTION_TYPE.API_END,
  payload: label,
});

export const accessDenied = url => ({
  type: API_ACTION_TYPE.ACCESS_DENIED,
  payload: {
    url,
  },
});

export const apiError = error => ({
  type: API_ACTION_TYPE.API_ERROR,
  payload: error,
});
