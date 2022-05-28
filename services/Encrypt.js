import CryptoJS from 'crypto-js';

export const password = '';

export const encrypt = str => {
  return CryptoJS.TripleDES.encrypt(str, password).toString();
};

export const decrypt = (data, isObj) => {
  const bytes = CryptoJS.TripleDES.decrypt(data, password);
  return isObj
    ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    : bytes.toString(CryptoJS.enc.Utf8);
};
