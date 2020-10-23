import { actionMappingForApi } from '../utilities/index';
import { apiKeys } from '../Actions/Helper/apiKeys';

export default function (state = { isLoading: false, data: null, error: null }, action) {
    let newState;
    const actionsForRoute = actionMappingForApi(apiKeys.registration);
    if (!actionsForRoute) {
        return null;
    }
    const {
        inProgressActionName,
        failureActionName,
        successActionName,
    } = actionsForRoute;
    switch (action.type) {
        case inProgressActionName: {
            let data = null;
            if (state && state.data) {
                data = state.data;
            }
            newState = {
                ...state,
                data,
                error: null,
                isLoading: true,
            };
            break;
        }
        case successActionName: {
            newState = {
                ...state,
                data: action.payload.data,
                error: null,
                isLoading: false,
            };
            break;
        }
        case failureActionName: {
            const errorMessage = action.payload;
            newState = {
                ...state,
                data: null,
                error: errorMessage,
                isLoading: false,
            };
            break;
        }
        default:
            newState = state;
            break;
    }
    return newState;
}
