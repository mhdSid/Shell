import isUndefined from 'lodash/isUndefined';
import isNill from 'lodash/isNil';

import CryptoJS from 'crypto-js';

const keySize = 256;
const iterations = 100;

const password = 'sippi44448888';

const encrypt = (msg, pass) => {
  const salt = CryptoJS.lib.WordArray.random(128 / 8);

  const key = CryptoJS.PBKDF2(pass, salt, {
    keySize: keySize / 32,
    iterations,
  });

  const iv = CryptoJS.lib.WordArray.random(128 / 8);

  const encrypted = CryptoJS.AES.encrypt(msg, key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  // salt, iv will be hex 32 in length
  // append them to the ciphertext for use  in decryption
  const transitmessage = salt.toString() + iv.toString() + encrypted.toString();
  return transitmessage;
};

const decrypt = (transitmessage, pass) => {
  const salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
  const iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32));
  const encrypted = transitmessage.substring(64);

  const key = CryptoJS.PBKDF2(pass, salt, {
    keySize: keySize / 32,
    iterations,
  });

  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return decrypted;
};

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

export {encrypt, decrypt, request};
