import {setUserBottomBarImage} from '../../components/MainContainer';
import {decrypt, password} from '../../services/Encrypt';
import {authActions} from './actions';

const initialState = {
  loggedIn: undefined,
  user: undefined,
  country: 'JP',
  email: undefined,
  passwordHash: undefined,
  verificationId: undefined,
  showSignup: undefined,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.login: {
      const {user} = action.payload;
      console.log(user);
      if (user) {
        if (user.creditCardNumber) {
          user.creditCardNumber = decrypt(user.creditCardNumber);
        }
        if (user.creditCardExpiryDate) {
          user.creditCardExpiryDate = decrypt(user.creditCardExpiryDate);
        }
        if (user.creditCardCVC) {
          user.creditCardCVC = decrypt(user.creditCardCVC);
        }
        if (user.creditCardType) {
          user.creditCardType = decrypt(user.creditCardType);
        }
        if (user.image) {
          setUserBottomBarImage(user.image);
        }
      }
      return {
        ...state,
        ...action.payload,
        user,
      };
    }
    case authActions.update: {
      const user = {
        ...state.user,
        ...action.payload,
      };
      if (user.creditCardNumber) {
        user.creditCardNumber = decrypt(user.creditCardNumber);
      }
      if (user.creditCardExpiryDate) {
        user.creditCardExpiryDate = decrypt(user.creditCardExpiryDate);
      }
      if (user.creditCardCVC) {
        user.creditCardCVC = decrypt(user.creditCardCVC);
      }
      if (user.creditCardType) {
        user.creditCardType = decrypt(user.creditCardType);
      }
      if (user.image) {
        setUserBottomBarImage(user.image);
      }
      return {
        ...state,
        user,
      };
    }
    case authActions.logout: {
      setUserBottomBarImage();
      return {
        ...initialState,
        ...action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default authReducer;
