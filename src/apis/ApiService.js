import axios from 'axios';

//const AUTH_HEADER_STR = 'Authorization';
export const ALPHA_API_STACK = 'https://alpha.jamwerks.io';
const ALPHA_DATA_URL = 'https://data.alpha.jamwerks.io';

export function isLocalHost() {
  const { hostname } = window.location;
  return hostname === 'localhost' || hostname.startsWith('127.0.0.1');
}

export function getStack() {
  //const { host } = window.location;

  if (isLocalHost()) {
    return 'ALPHA';
  }
  return 'ALPHA';
  //console.error('Unknown stack', host);
}

export function getBaseUrl() {
  const stack = getStack();
  switch (stack) {
    case 'ALPHA':
      return ALPHA_API_STACK;
    default:
      console.error('Unable to find API stack');
  }
}

export function getBaseDataUrl() {
  const stack = getStack();
  switch (stack) {
    case 'ALPHA':
      return ALPHA_DATA_URL;
    default:
      console.error('Unable to find data stack');
  }
}

export async function getAuthHeaders() {
  //const accessToken = await window.authProvider.getToken();

  const headers = {
    //  [AUTH_HEADER_STR]: accessToken,
  };

  return headers;
}

class AuthedApiSerivce {
  constructor(useAutoHeaders) {
    let service = axios.create({
      baseURL: getBaseUrl(),
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);

    if (useAutoHeaders) {
      service.interceptors.request.use(async (config) => {
        config.headers = await getAuthHeaders();
        return config;
      });
    }

    this.service = service;
  }

  handleSuccess(response) {
    return response.data;
  }

  handleError = (error) => {
    console.error(error);
    if (!error.response || !error.response.status) {
      return Promise.reject({
        errorData: error,
        status: null,
      });
    }
    switch (error.response.status) {
      case 401:
      case 403:
        console.error('You are not authorized');
        //this.redirectTo(document, LOGIN_PATH);
        break;
      default:
        alert(error.response.data);
        break;
    }
    return Promise.reject({
      errorData: error.response.data,
      status: error.response.status,
    });
  };

  redirectTo = (document, path) => {
    document.location = path;
  };

  get(path, config = {}) {
    return this.service.get(path, config);
  }

  put(path, data = {}, config = {}) {
    return this.service.put(path, data, config);
  }

  delete(path, config = {}) {
    return this.service.delete(path, config);
  }

  post(path, data = {}, config = {}) {
    return this.service.post(path, data, config);
  }
}

export const ApiService = new AuthedApiSerivce(false);
