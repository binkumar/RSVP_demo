import { apiKeys } from './apiKeys';

export const generateRoute = (apiKey, data) => {
  switch (apiKey) {
    default: {
      return null;
    }
    case apiKeys.registration:
      return `https://registration.free.beeceptor.com`;
  }
};

export const requestHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'cache-control': 'no-cache'
  };
  return headers;
};
