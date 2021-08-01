const about = {
  howTo: 'How-to Guide',
  sell: 'Sell',
  howToUseFirst:
    'Make a lottery about the item you want to sell - it could be anything you can think about!',
  howToUseSecond:
    'Users enter the lottery by paying a fee of ¥100 to have a chance to win the item that you have upload.',
  howToUseThird: '20% of the fee amount is used to sponsor and fund NGOs.',
  howToUseFourth:
    '30% of the fee amount goes to our company to continue running this service.',
  howToUseFifth: 'The rest 50% of the fee amount is added to the lottery.',
  howToUseSixth:
    'When the total monetary value in the lottery is equal to the price of your item, then our system randomly selects a winner.',
  howToUseSeventh:
    'The winner collects the item and you own the collected price value of your item.',
  or: 'Or',
  browse: 'Browse',
  howtoUseEigtth: 'Browser through a wide variety of uploaded items!',
  choose: 'Choose',
  howToUseNineth:
    'Make sure you choose any item you love. It can be a Smart Phone, a Laptop, a Car, a House, or anything you can think about.',
  howToUseTenth:
    'Pay a fee of ¥100 to enter a lottery and have a chance to win any item of your choice.\n\n 20% of the fee amount is used to sponsor and fund NGOs.\n\n 30% of the fee amount goes to our company to continue running this service.\n\n The rest 50% of the fee amount is added to the lottery.',
  howToUseEleventh:
    'When the total monetary value in the lottery is equal to the price of your chosen item, then our system randomly selects a winner.',
  enterLottery: 'Enter Lottery',
  win: 'Win',
};

const errors = {
  error: 'A an error has occured. Please try again.',
};

const adDetails = {
  enterDraw: 'Win',
  availability: 'Availabality',
  adAvailable: 'The lottery is currently available',
  adNotAvailable: 'The lottery is not available',
  totalPrice: 'Total Price',
  collectedPrice: 'Collected Price',
  payToWin: 'Pay to Win the Lottery',
  currentLotteryUsers: 'Current lottery users',
  currentLotteryUsersNumber: lotteryUserIds => {
    if (!lotteryUserIds || !lotteryUserIds.length) {
      return;
    }
    const lotteryUserIdsLength = lotteryUserIds.length;
    if (lotteryUserIdsLength === 1) {
      return `${lotteryUserIdsLength} user has joined this lottery.`;
    }
    return `${lotteryUserIdsLength} users have joined this lottery.`;
  },
  winner: 'Winner',
  name: 'Name',
  description: 'Description',
  status: 'Condition',
  category: 'Category',
  publishDate: 'Publish Date',
  location: 'Location',
  user: 'User',
  adId: 'Ad ID',
  emptyUserAds: 'User has no available lotteries',
  userLotteries: 'User Lotteries',
};

const home = {
  appName: 'Shell',
};

const importAd = {
  sports: 'Sports',
  noNoticableScratches: 'No Noticable Scratches or Dirt',
  createLottery: 'Create a lottery',
  create: 'Create',
  productName: 'Item name',
  adName: 'Name',
  description: 'Description',
  price: 'Price',
  images: 'Images',
  prefecture: 'Prefecture',
  city: 'City',
  category: 'Category',
  status: 'Condition',
  enterCategory: 'Enter category',
  enterStatus: 'Enter status',
  enterName: 'Enter name',
  enterDescription: 'Enter description',
  enterPrice: 'Enter price',
};

const lottteries = {
  lotteries: 'My joined lotteries',
  emptyLotteries: 'No Lotteries available.',
};

const chat = {
  chat: 'Chat',
};

const myyAds = {
  myAds: 'My Ads',
};

const myyLotteries = {
  myLotteries: 'My Lotteries',
};

const noAuth = {
  loginSingup: 'Please login or signup to add a new item.',
};

const loginSingup = 'Login / Sign up';
const login = 'Login';
const signUp = 'Sign up';
const orLogin = 'Or Login';
const orSignUp = 'Or Signup';

const notifications = {
  notifications: 'Notifications',
};

const uploadAdProgress = {
  uploading: 'Currently Uploading',
  noItems: 'No items are being uploaded.',
};

const paymentInformation = {
  paymentInformation: 'Payment Information',
  submit: 'Save',
  creditCard: 'Credit Card',
};

const profile = {
  japan: 'Japan',
  male: 'Male',
  female: 'Female',
  initialYear: '2020',
  initialMonth: 'April',
  initialDay: '01',
  points: 'Points',
  firstName: 'First Name',
  lastName: 'Last Name',
  phoneNumber: 'Phone Number',
  mobile: 'Mobile',
  enterEmail: 'Enter email',
  enterPassword: 'Enter password',
  gender: 'Gender',
  loginOrSignup: 'Login or Sign up',
  dateOfBirth: 'Date of birth',
  country: 'Country',
  postalCode: 'Postal Code',
  prefecture: 'Prefecture',
  city: 'City',
  agreePriacyPolicy: 'Agree on privacy policy',
  enterPrefecture: 'Enter prefecture',
  enterCity: 'Enter city',
  cityWard: 'City Ward',
  fullAddress: 'Full Address',
  fillInformationCorrectly:
    'Make sure to correctly fill all this required information as it affects your selling/winning process!',
  signUp: 'Sign up',
  shellSignUp: 'Sign up to Shell',
  verifyAccount: 'Verify your account',
  verify: 'Verify',
  checkYourInbox:
    'Please check your e-mail inbox in order to verify your email.',
  howToUseTheApp: 'How to use the App',
  notifications: 'Notifications',
  paymentInformation: 'Payment information',
  // myAds: 'My Ads',
  myLotteries: 'My lotteries',
  myCreatedLotteries: 'My created lotteries',
  personal: 'Personal',
  settings: 'Settings',
  logout: 'Logout',
  info: 'Info',
  email: 'Email',
  password: 'Password',
};

const searchh = {
  search: 'Search',
};

const settings = {
  settings: 'Settings',
  changePassword: 'Change Password',
  language: 'Language',
  privacy: 'Privacy',
  privacyAndTerms: 'Terms and Privacy Policy',
  contactUs: 'Contact Us',
  security: 'Security',
  faq: 'FAQ',
  licenses: 'Licenses',
  en: 'US',
  jp: 'JP',
  english: 'English',
  japanese: 'Japanese',
  version: 'Version',
};

const updateUserr = {
  updateProfile: 'Update Profile',
  save: 'Save',
  firstName: 'First Name',
  lastName: 'Last Name',
  phoneNumber: 'Phone Number',
  mobile: 'Mobile',
  country: 'Country',
  postalCode: 'Postal Code',
  prefecture: 'Prefecture',
  city: 'City',
  cityWard: 'City Ward',
  fullAddress: 'Full Address',
  confirm: 'Confirm',
  japan: 'Japan',
  passsword: 'Password',
  currentPassword: 'Current Password',
  newPassword: 'New Password',
  update: 'Update',
};

const userDetails = {
  name: 'Name',
  email: 'Email',
  location: 'Location',
  postalCode: 'Postal Code',
  cityWard: 'City / Ward',
  fullAddress: 'Full Address',
  userId: 'User ID',
  mobile: 'Mobile',
};

const payment = {
  title: 'Get a Chance to Win',
  submit: 'Pay fee of ¥100',
  cancel: 'Cancel',
};

const uploadProgress = {
  inProgress: length => `Uploading ${length} ${length > 1 ? 'Ads' : 'Ad'}`,
  uploadPgress: 'Upload in progress',
};

export {
  about,
  errors,
  adDetails,
  home,
  importAd,
  lottteries,
  myyAds,
  myyLotteries,
  noAuth,
  loginSingup,
  notifications,
  profile,
  searchh,
  settings,
  updateUserr,
  userDetails,
  uploadProgress,
  payment,
  paymentInformation,
  uploadAdProgress,
  login,
  signUp,
  orLogin,
  orSignUp,
  chat,
};
