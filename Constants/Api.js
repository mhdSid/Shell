const generateBoundary = () => {
  let boundary = '----WebKitFormBoundary';
  for (let count = 0; count < 16; count++) {
    boundary += Math.floor(Math.random() * 10).toString(16);
  }
  return boundary;
};

const apiRequest = {
  apiUri: 'http://192.168.100.105:8080/', //'https://shell-269400.an.r.appspot.com/', ////'http://192.168.100.105:8080/', //'https://halogen-proxy-239213.appspot.com/', //shell-269400.appspot.com // https://shell-269400.an.r.appspot.com
  formContentType: () => `multipart/form-data; boundary=${generateBoundary()}`,
  jsonContentType: 'application/json',
};

export {apiRequest};
