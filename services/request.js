import {apiRequest} from '../constants/Api';
import cancellableFetch from 'react-native-cancelable-fetch';

const request = async options => {
  const {method, body, endpoint, cancelTag} = options;
  let reqData = {
    method,
    headers: {
      Accept: apiRequest.jsonContentType,
      'Content-Type': apiRequest.jsonContentType,
    },
  };
  if (body instanceof FormData) {
    reqData.headers['Content-Type'] = apiRequest.formContentType();
  }
  if (body && Object.keys(body).length) {
    reqData = {
      ...reqData,
      body: body instanceof FormData ? body : JSON.stringify(body),
    };
  }
  const response = await cancellableFetch(
    `${apiRequest.apiUri}${endpoint}`,
    reqData,
    cancelTag,
  );
  if (response) {
    let data = await response.json();
    if (data.data || data.error || data.user) {
      data = data.data || data.error || data.user;
      if (data && Object.keys(data).length) {
        return data;
      }
    }
  }
  return undefined;
};

export {request};
