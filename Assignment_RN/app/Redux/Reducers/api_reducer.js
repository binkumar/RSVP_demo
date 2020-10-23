import {API_ACTION_TYPE} from '../Actions/Helper/types';

export default function(state = {}, action) {
  switch (action.type) {
    case API_ACTION_TYPE.API_START:
    case API_ACTION_TYPE.API_END:
    case API_ACTION_TYPE.ACCESS_DENIED:
    case API_ACTION_TYPE.API_ERROR:
      return {data: action.payload};
    default:
      return state;
  }
}
