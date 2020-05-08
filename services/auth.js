import {request} from './request';

const login = async props => {
  const {email, password} = props;

  const data = await request({
    endpoint: 'users/authenticate/email',
    method: 'POST',
    body: {
      email,
      password,
    },
  });

  return data;
};

const logout = async () => {
  const data = await request({
    endpoint: 'users/authenticate/logout',
    method: 'GET',
  });
  return data;
};

const ping = async () => {
  const data = await request({
    endpoint: 'users/authenticate/ping',
    method: 'GET',
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
  formData.append('id', id);
  formData.append('email', email);

  const data = await request({
    endpoint: 'users/authenticate/update',
    method: 'POST',
    body: formData,
  });

  return data;
};

export {login, logout, ping, verify, signup, update, search, getUsersData};
