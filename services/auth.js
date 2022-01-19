import {request} from './Request';
import sha256 from 'crypto-js/sha256';
import {encrypt, password as hashkey} from './Encrypt';
import {apiRequest} from '../Constants/Api';
import Upload from 'react-native-background-upload';

const login = async props => {
  const {email, password} = props;
  const passwordHash = sha256(password + hashkey).toString();
  const data = await request({
    endpoint: 'api/user/authenticate/email',
    method: 'POST',
    body: {
      email,
      passwordHash,
      hash: sha256(email + passwordHash + hashkey).toString(),
    },
  });
  return data;
};

const logout = async () => {
  const data = await request({
    endpoint: 'api/user/authenticate/logout',
    method: 'POST',
    body: {
      hash: sha256(hashkey).toString(),
    },
  });
  return data;
};

const ping = async () => {
  const data = await request({
    endpoint: 'api/user/authenticate/ping',
    method: 'POST',
    body: {
      hash: sha256(hashkey).toString(),
    },
  });
  return data;
};

const verify = async props => {
  const {email, passwordHash, verificationCode} = props;
  const data = await request({
    endpoint: 'api/user/authenticate/email/verify',
    method: 'POST',
    body: {
      email,
      passwordHash,
      verificationCode,
      hash: sha256(
        email + passwordHash + verificationCode + hashkey,
      ).toString(),
    },
  });
  return data;
};

const resendVerificationCode = async props => {
  const {email, passwordHash} = props;
  const data = await request({
    endpoint: 'api/user/authenticate/email/verify/resend',
    method: 'POST',
    body: {
      email,
      passwordHash,
      hash: sha256(email + passwordHash + hashkey).toString(),
    },
  });
  return data;
};

const signup = async props => {
  const {
    email,
    passwordHash,
    verificationCode,
    country,
    prefecture,
    city,
  } = props;
  const data = await request({
    endpoint: 'api/user/authenticate/signup',
    method: 'POST',
    body: {
      email,
      passwordHash,
      verificationCode,
      country,
      prefecture,
      city,
      hash: sha256(
        email +
          passwordHash +
          verificationCode +
          country +
          prefecture +
          city +
          hashkey,
      ).toString(),
    },
  });
  return data;
};

const getUsersData = async props => {
  const {users, cancelTag} = props;
  const data = await request({
    endpoint: 'api/user/userData',
    method: 'POST',
    cancelTag,
    body: {
      users,
      hash: sha256(JSON.stringify(users).toString() + hashkey).toString(),
    },
  });
  return data;
};

const updateUserBackground = async props => {
  const {
    country,
    prefecture,
    image,
    city,
    id,
    email,
    passwordHash,
    creditCardNumber,
    creditCardExpiryDate,
    creditCardCVC,
    creditCardType,
  } = props;
  let creditCardNumberEnc;
  let creditCardCVCEnc;
  let creditCardExpiryDateEnc;
  let creditCardTypeEnc;
  let formData = {};
  if (country) {
    formData = {
      ...formData,
      country,
    };
  }
  if (city) {
    formData = {
      ...formData,
      city,
    };
  }
  if (prefecture) {
    formData = {
      ...formData,
      prefecture,
    };
  }
  if (passwordHash) {
    formData = {
      ...formData,
      passwordHash,
    };
  }
  if (creditCardNumber) {
    creditCardNumberEnc = encrypt(creditCardNumber);
    formData = {
      ...formData,
      creditCardNumber: creditCardNumberEnc,
    };
  }
  if (creditCardExpiryDate) {
    creditCardExpiryDateEnc = encrypt(creditCardExpiryDate);
    formData = {
      ...formData,
      creditCardExpiryDate: creditCardExpiryDateEnc,
    };
  }
  if (creditCardCVC) {
    creditCardCVCEnc = encrypt(creditCardCVC);
    formData = {
      ...formData,
      creditCardCVC: creditCardCVCEnc,
    };
  }
  if (creditCardType) {
    creditCardTypeEnc = encrypt(creditCardType);
    formData = {
      ...formData,
      creditCardType: creditCardTypeEnc,
    };
  }
  const options = {
    url: `${apiRequest.apiUri}api/user/authenticate/update`,
    path: image.uri,
    method: 'POST',
    field: 'image',
    type: 'multipart',
    headers: {
      Accept: apiRequest.jsonContentType,
      'Content-Type': apiRequest.jsonContentType,
    },
    parameters: {
      id,
      email,
      ...formData,
      hash: sha256(
        (country || '') +
          (prefecture || '') +
          (city || '') +
          (passwordHash || '') +
          (creditCardNumberEnc || '') +
          (creditCardExpiryDateEnc || '') +
          (creditCardCVCEnc || '') +
          (creditCardTypeEnc || '') +
          (id || '') +
          (email || '') +
          hashkey,
      ).toString(),
    },
  };
  return new Promise(resolve => {
    Upload.startUpload(options)
      .then(uploadId => {
        let errorSubscriber, completedSubscriber, cancelledSubscriber;
        completedSubscriber = Upload.addListener(
          'completed',
          uploadId,
          data => {
            // data includes responseCode: number and responseBody: Object
            let response = {};
            if (data.responseBody) {
              response = JSON.parse(data.responseBody).data;
            }
            resolve(response);
            errorSubscriber.remove();
            completedSubscriber.remove();
            cancelledSubscriber.remove();
          },
        );
        cancelledSubscriber = Upload.addListener(
          'cancelled',
          uploadId,
          data => {
            resolve({error: data});
            errorSubscriber.remove();
            completedSubscriber.remove();
            cancelledSubscriber.remove();
          },
        );
        errorSubscriber = Upload.addListener('error', uploadId, data => {
          resolve({error: data});
          errorSubscriber.remove();
          completedSubscriber.remove();
          cancelledSubscriber.remove();
        });
      })
      .catch(err => {
        resolve({error: err});
      });
  });
};

const update = async props => {
  const {
    country,
    prefecture,
    image,
    city,
    id,
    email,
    passwordHash,
    creditCardNumber,
    creditCardExpiryDate,
    creditCardCVC,
    creditCardType,
  } = props;
  const formData = new FormData();
  let creditCardNumberEnc;
  let creditCardCVCEnc;
  let creditCardExpiryDateEnc;
  let creditCardTypeEnc;
  if (country) {
    formData.append('country', country);
  }
  if (city) {
    formData.append('city', city);
  }
  if (image) {
    formData.append('image', image);
  }
  if (prefecture) {
    formData.append('prefecture', prefecture);
  }
  if (passwordHash) {
    formData.append('passwordHash', passwordHash);
  }
  if (creditCardNumber) {
    creditCardNumberEnc = encrypt(creditCardNumber);
    formData.append('creditCardNumber', creditCardNumberEnc);
  }
  if (creditCardExpiryDate) {
    creditCardExpiryDateEnc = encrypt(creditCardExpiryDate);
    formData.append('creditCardExpiryDate', creditCardExpiryDateEnc);
  }
  if (creditCardCVC) {
    creditCardCVCEnc = encrypt(creditCardCVC);
    formData.append('creditCardCVC', creditCardCVCEnc);
  }
  if (creditCardType) {
    creditCardTypeEnc = encrypt(creditCardType);
    formData.append('creditCardType', creditCardTypeEnc);
  }
  formData.append('id', id);
  formData.append('email', email);
  formData.append(
    'hash',
    sha256(
      (country || '') +
        (prefecture || '') +
        (city || '') +
        (passwordHash || '') +
        (creditCardNumberEnc || '') +
        (creditCardExpiryDateEnc || '') +
        (creditCardCVCEnc || '') +
        (creditCardTypeEnc || '') +
        (id || '') +
        (email || '') +
        hashkey,
    ).toString(),
  );
  const data = await request({
    endpoint: 'api/user/authenticate/update',
    method: 'POST',
    body: formData,
  });
  return data;
};

export {
  login,
  logout,
  ping,
  verify,
  signup,
  update,
  getUsersData,
  updateUserBackground,
  resendVerificationCode,
};
