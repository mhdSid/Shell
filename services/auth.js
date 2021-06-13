import {request} from './Request';
import sha256 from 'crypto-js/sha256';
import {password as hashkey} from './Encrypt';

const login = async props => {
  const {email, password} = props;
  const data = await request({
    endpoint: 'users/authenticate/email',
    method: 'POST',
    body: {
      email,
      password,
      hash: sha256(email + password + hashkey).toString(),
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
  const {email, password, verificationId} = props;
  const data = await request({
    endpoint: 'users/authenticate/email/verify',
    method: 'POST',
    body: {
      email,
      password,
      verificationId,
      hash: sha256(email + password + verificationId + hashkey).toString(),
    },
  });
  return data;
};

const signup = async props => {
  const {
    email,
    password,
    verificationId,
    dob,
    gender,
    mobile,
    country,
    prefecture,
    firstName,
    lastName,
    postalCode,
    fullAddress,
    cityWard,
  } = props;
  const data = await request({
    endpoint: 'users/authenticate/signup',
    method: 'POST',
    body: {
      email,
      password,
      verificationId,
      dob,
      gender,
      mobile,
      country,
      prefecture,
      firstName,
      lastName,
      postalCode,
      fullAddress,
      cityWard,
      hash: sha256(
        email +
          password +
          verificationId +
          dob +
          gender +
          mobile +
          country +
          prefecture +
          firstName +
          lastName +
          postalCode +
          fullAddress +
          cityWard +
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
    mobile,
    country,
    prefecture,
    postalCode,
    fullAddress,
    firstName,
    lastName,
    image,
    id,
    email,
    cityWard,
    password,
    creditCardNumber,
    creditCardExpiryDate,
    creditCardCVC,
    creditCardType,
  } = props;
  const formData = new FormData();
  if (mobile) {
    formData.append('mobile', mobile);
  }
  if (country) {
    formData.append('country', country);
  }
  if (image) {
    formData.append('image', image);
  }
  if (prefecture) {
    formData.append('prefecture', prefecture);
  }
  if (password) {
    formData.append('password', password);
  }
  if (firstName) {
    formData.append('firstName', firstName);
  }
  if (postalCode) {
    formData.append('postalCode', postalCode);
  }
  if (cityWard) {
    formData.append('cityWard', cityWard);
  }
  if (fullAddress) {
    formData.append('fullAddress', fullAddress);
  }
  if (lastName) {
    formData.append('lastName', lastName);
  }
  if (creditCardNumber) {
    formData.append('creditCardNumber', creditCardNumber);
  }
  if (creditCardExpiryDate) {
    formData.append('creditCardExpiryDate', creditCardExpiryDate);
  }
  if (creditCardCVC) {
    formData.append('creditCardCVC', creditCardCVC);
  }
  if (creditCardType) {
    formData.append('creditCardType', creditCardType);
  }
  formData.append('id', id);
  formData.append('email', email);
  formData.append(
    'hash',
    sha256(
      mobile +
        country +
        prefecture +
        password +
        firstName +
        postalCode +
        cityWard +
        fullAddress +
        lastName +
        creditCardNumber +
        creditCardExpiryDate +
        creditCardCVC +
        creditCardType +
        id +
        email +
        hashkey,
    ).toString(),
  );
  const data = await request({
    endpoint: 'users/authenticate/update',
    method: 'POST',
    body: formData,
  });
  return data;
};

export {login, logout, ping, verify, signup, update, search, getUsersData};
