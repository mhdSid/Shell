import CryptoJS from 'crypto-js';
import {decrypt, password} from './Encrypt';
import {apiRequest} from '../Constants/Api';

const request = async options => {
  const {method, body, endpoint} = options;
  let reqData = {
    method,
    headers: {
      Accept: apiRequest.jsonContentType,
      'Content-Type': apiRequest.jsonContentType,
    },
  };
  if (body instanceof FormData) {
    reqData.headers['Content-Type'] = apiRequest.formContentType;
  }
  if (body && Object.keys(body).length > 0) {
    reqData = {
      ...reqData,
      body: body instanceof FormData ? body : JSON.stringify(body),
    };

    // todo: encrypt all bodies
  }
  const response = await fetch(`${apiRequest.apiUri}${endpoint}`, reqData);
  if (response) {
    let data = await response.json();
    if (data.data || data.error || data.user) {
      data = decrypt(data.data || data.error || data.user, password);
      data = JSON.parse(data.toString(CryptoJS.enc.Utf8));
      if (data && Object.keys(data).length > 0) {
        data = {...data};
        return data;
      }
    }
  }
  return undefined;
};

export {request};
