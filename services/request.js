import CryptoJS from 'crypto-js';
import isUndefined from 'lodash/isUndefined';
import isNill from 'lodash/isNil';
import {decrypt, password} from './Encrypt';

const request = async options => {
  const {method, body, endpoint} = options;
  let reqData = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (body instanceof FormData) {
    reqData.headers['Content-Type'] =
      'multipart/form-data; boundary=----WebKitFormBoundarybAbXQzJABEgSJzxT';
  }
  if (!isUndefined(body) && !isNill(body) && Object.keys(body).length > 0) {
    reqData = {
      ...reqData,
      body: body instanceof FormData ? body : JSON.stringify(options.body),
    };
  }
  const response = await fetch(
    `https://halogen-proxy-239213.appspot.com/${endpoint}`,
    reqData,
  );
  if (typeof response !== 'undefined' && response !== null) {
    let data = await response.json();
    if (data.data || data.error || data.user) {
      data = decrypt(data.data || data.error || data.user, password);
      data = JSON.parse(data.toString(CryptoJS.enc.Utf8));
      if (
        typeof data !== 'undefined' &&
        data !== null &&
        Object.keys(data).length > 0
      ) {
        data = {...data};
        return data;
      }
    }
  }
  return undefined;
};

export {request};
