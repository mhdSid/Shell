// import DeviceInfo from 'react-native-device-info';
import isUndefined from 'lodash/isUndefined';
import isNill from 'lodash/isNil';
// import AsyncStorage from '@react-native-community/async-storage';

import CryptoJS from 'crypto-js';
// const algorithm = 'aes-256-cbc';
// Code goes here
const keySize = 256;
// const ivSize = 128;
const iterations = 100;

// const fingerprint = DeviceInfo.getUniqueID();
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
    console.log('is instance form data');
    reqData.headers.Accept =
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9';
  }

  if (!isUndefined(body) && !isNill(body) && Object.keys(body).length > 0) {
    reqData = {
      ...reqData,
      body: body instanceof FormData ? body : JSON.stringify(options.body), // body instanceof FormData ? body :
    };
  }

  const response = await fetch(
    `https://halogen-proxy-239213.appspot.com/${endpoint}`,
    reqData,
  );

  if (typeof response !== 'undefined' && response !== null) {
    let data = await response.json();

    if (data.data || data.error || data.user) {
      console.log('response: ', data);
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

// const getAsyncStorage = async name => {
//   try {
//     const value = await AsyncStorage.getItem(name);
//     if (value !== null) {
//       // We have data!!
//       console.log(value);
//       return value;
//     }
//   } catch (error) {
//     // Error retrieving data
//   }
// };

// const setAsyncStorage = async (name, value) => {
//   try {
//     await AsyncStorage.setItem(name, value);
//   } catch (error) {
//     // Error saving data
//   }
// };

// const removeAsyncStorage = async name => {
//   try {
//     await AsyncStorage.removeItem(name);
//   } catch (error) {
//     // Error saving data
//   }
// };

export {
  encrypt,
  decrypt,
  request,
  // getAsyncStorage,
  // setAsyncStorage,
  // removeAsyncStorage,
};
