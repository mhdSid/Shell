import {request} from './Request';
import sha256 from 'crypto-js/sha256';
import {encrypt, password as hashkey} from './Encrypt';

const login = async props => {
  const {email, password} = props;
  const passwordHash = sha256(password + hashkey).toString();
  console.log(passwordHash);
  const data = await request({
    endpoint: 'users/authenticate/email',
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
    endpoint: 'users/authenticate/logout',
    method: 'POST',
    body: {
      hash: sha256(hashkey).toString(),
    },
  });
  return data;
};

const ping = async () => {
  const data = await request({
    endpoint: 'users/authenticate/ping',
    method: 'POST',
    body: {
      hash: sha256(hashkey).toString(),
    },
  });
  return data;
};

const verify = async props => {
  const {email, passwordHash, verificationId} = props;
  const data = await request({
    endpoint: 'users/authenticate/email/verify',
    method: 'POST',
    body: {
      email,
      passwordHash,
      verificationId,
      hash: sha256(email + passwordHash + verificationId + hashkey).toString(),
    },
  });
  return data;
};

const signup = async props => {
  console.log(' ');
  console.log('SignupSignUp: ', props);
  const {
    email,
    passwordHash,
    verificationId,
    // dob,
    // gender,
    // mobile,
    country,
    prefecture,
    // firstName,
    // lastName,
    // postalCode,
    city,
    // fullAddress,
  } = props;
  console.log(
    'hash: ',
    sha256(
      email +
        passwordHash +
        verificationId +
        // `${dob}` +
        // gender +
        // mobile +
        country +
        prefecture +
        city +
        // firstName +
        // lastName +
        // postalCode +
        // fullAddress +
        hashkey,
    ).toString(),
  );
  const data = await request({
    endpoint: 'users/authenticate/signup',
    method: 'POST',
    body: {
      email,
      passwordHash,
      verificationId,
      // dob: `${dob}`,
      // gender,
      // mobile,
      country,
      prefecture,
      city,
      // firstName,
      // lastName,
      // postalCode,
      // fullAddress,
      hash: sha256(
        email +
          passwordHash +
          verificationId +
          // dob +
          // gender +
          // mobile +
          country +
          prefecture +
          city +
          // firstName +
          // lastName +
          // postalCode +
          // fullAddress +
          hashkey,
      ).toString(),
    },
  });
  return data;
};

const search = async props => {
  const {searchQuery} = props;
  const data = await request({
    endpoint: 'users/authenticate/search',
    method: 'POST',
    body: {
      query: searchQuery,
      hash: sha256(searchQuery + hashkey).toString(),
    },
  });
  return data;
};

const getUsersData = async props => {
  const {users} = props;
  const data = await request({
    endpoint: '/api/users/userData',
    method: 'POST',
    body: {
      users,
      hash: sha256(JSON.stringify(users).toString() + hashkey).toString(),
    },
  });
  return data;
};

const update = async props => {
  const {
    // mobile,
    country,
    prefecture,
    // postalCode,
    // fullAddress,
    // firstName,
    // lastName,
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
  // if (mobile) {
  //   formData.append('mobile', mobile);
  // }
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
  console.log(formData);
  const data = await request({
    endpoint: 'users/authenticate/update',
    method: 'POST',
    body: formData,
  });
  return data;
};

export {login, logout, ping, verify, signup, update, search, getUsersData};
