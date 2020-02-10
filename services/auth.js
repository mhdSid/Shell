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
  // .then(data => {
  //   if (!isUndefined(data)) {
  //     console.log('herererere data', data);
  //   }
  // });
};

const logout = async () => {
  const data = await request({
    endpoint: 'users/authenticate/logout',
    method: 'GET',
  });
  console.log('logououououoout ', data);
  return data;
};

const ping = async () => {
  const data = await request({
    endpoint: 'users/authenticate/ping',
    method: 'GET',
  });
  console.log('logououououoout ', data);
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
    perfecture,
    firstName,
    lastName,
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
      perfecture,
      firstName,
      lastName,
    },
  });

  return data;
};

export {login, logout, ping, verify, signup};
