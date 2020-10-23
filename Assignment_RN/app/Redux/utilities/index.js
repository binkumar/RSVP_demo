export const toCamelCase = str => {
  if (typeof str === 'string' && str.length > 0) {
    const firstChar = str.slice(0, 1).toLowerCase();
    return firstChar + str.substr(1);
  }
  return str;
};

export const convertObjectToLowerCaseKeys = obj => {
  if (obj === null) {
    return {};
  }
  let newObj = {};
  if (Array.isArray(obj)) {
    newObj = obj.map(x => convertObjectToLowerCaseKeys(x));
  } else {
    for (const key of Object.keys(obj)) {
      newObj[toCamelCase(key)] =
        typeof obj[key] === 'object' && obj[key] !== null
          ? convertObjectToLowerCaseKeys(obj[key])
          : obj[key];
    }
  }

  return newObj;
};

export const FETCH_STATUS = {
  FETCH_SUCCESS: 'SEARCH',
  FETCH_FAILURE: 'FETCH_FAILURE',
  FETCH_IN_PROGRESS: 'FETCH_IN_PROGRESS',
};

export const actionMappingForApi = apiName => ({
  inProgressActionName: `${apiName}_${FETCH_STATUS.FETCH_IN_PROGRESS}`,
  failureActionName: `${apiName}_${FETCH_STATUS.FETCH_FAILURE}`,
  successActionName: `${apiName}_${FETCH_STATUS.FETCH_SUCCESS}`,
});
