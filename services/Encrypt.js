import CryptoJS from 'crypto-js';

const password = 'sippi44448888';

const encrypt = str => {
  return CryptoJS.TripleDES.encrypt(str, password).toString();
};

const decrypt = (data, isObj) => {
  const bytes = CryptoJS.TripleDES.decrypt(data, password);
  return isObj
    ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    : bytes.toString(CryptoJS.enc.Utf8);
};

export {encrypt, decrypt, password};
