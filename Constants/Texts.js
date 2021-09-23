const about = {
  howTo: 'How to use the App',
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
  joinLottery: 'Join Lottery',
};

const errors = {
  error: 'A error has occured. Please try again.',
};

const successConfirmationModal = {
  importLottery: {
    title: 'YOUR LOTTERY HAS BEEN CREATED!',
    subtitle:
      'Now, you can wait until users join your lottery. Meanwhile, keep browsing the app.',
    actions: {
      continueBrowsing: {
        text: 'Continue Browsing',
        icon: 'home',
      },
      createAnotherLottery: {
        text: 'Create Another Lottery',
        icon: 'add',
      },
    },
  },
  payment: {
    title: 'YOU HAVE SUCCESSFULLY JOINED THIS LOTTERY!',
    subtitle:
      'Now, you can be patient for the results after other users join this lottery and the lottery price is collected. Meanwhile, please note that you can join the same lottery as much as you wish.',
    actions: {
      joinAgain: {
        text: 'Join lottery again',
        icon: 'repeat',
      },
      goBack: {
        text: 'Return to lottery details',
        icon: 'chevron-left',
      },
    },
  },
};

const lotteryResult = {
  lotteryResult: 'Lottery Result',
  actionOptions: {
    chat: 'chat',
    receive: 'receive',
    ship: 'ship',
  },
  lotteryWinnerActions: [
    {icon: 'chat', text: 'Chat with owner', action: 'chat'},
    {icon: 'markunread-mailbox', text: 'Receive', action: 'receive'},
  ],
  lotteryPosterActions: [
    {icon: 'chat', text: 'Chat with winner', action: 'chat'},
    {icon: 'local-shipping', text: 'Ship', action: 'ship'},
  ],
  congratulations: 'Congratulations!',
};

const validationMessages = {
  search: {
    searchQuery: 'Length should be between 2 and 100 characters.',
    toDate: 'To date should be formatted like yyyy/mm/dd',
    fromDate: 'From date should be formatted like yyyy/mm/dd',
    fromDateLessThanToDate: 'From date should be less than To date',
    toDateGreaterThanFromDate: 'To date should be greater than From date',
  },
  importLottery: {
    adName: 'Length should be between 5 and 30 characters.',
    description: 'Length should be between 20 and 500 characters.',
    price: 'Price should be be divisble by 100',
  },
  loginSignup: {
    email: 'Please enter a valid email.',
    password: 'Length should be between 6 and 50 characters.',
  },
  changePassword: {
    currentPassword: 'The entered password does not match your current one.',
    newPassword:
      'New password should be diferent than your current one and length should be between 6 and 50 characters.',
  },
};

const lotteryDetails = {
  cancelLottery: 'Cancel Lottery',
  reAddLottery: 'Readd Lottery',
  shareLottery: 'Share Lottery',
  areYouSureShare: 'Share',
  cancelThisLottery: 'Cancel this lottery',
  reAddThisLottery: 'Readd this lottery',
  close: 'Close',
  areYouSureCancel:
    'You are about to cancel this lottery. Are you sure you want to cancel it?',
  areYouSureReAdd:
    'You are about to make this lottery available again. Are you sure you want to proceed?',
  inProgress: 'This lottery is still in progress.',
  winnerAccouncementSoon: 'Kindly be patient for the winner announcement.',
  youAreTheWinner: 'YOU ARE THE WINNER OF THIS LOTTERY!',
  lotteryPosterWinner: 'THE LOTTERY PRIZE GOES TO THE WINNER',
  actionOptions: {
    share: 'share',
    like: 'like',
    dislike: 'dislike',
    win: 'win',
    receive: 'receive',
    ship: 'ship',
    cancel: 'cancel',
    readd: 'readd',
    result: 'result',
    chat: 'chat',
  },
  cancelled: 'Cancelled',
  cancelledOn: 'Cancelled on ',
  like: {icon: 'favorite-border', text: 'like', action: 'like'},
  cancelActions: [{icon: 'cancel', text: 'cancel', action: 'cancel'}],
  reAddActions: [{icon: 'check', text: 'readd', action: 'readd'}],
  dislike: {icon: 'favorite', text: 'dislike', action: 'dislike'},
  visitorActions: [
    {icon: 'shop', text: 'win', action: 'win'},
    {icon: 'share', text: 'share', action: 'share'},
    {icon: 'track-changes', text: 'result', action: 'result'},
  ],
  shipActions: [
    {icon: 'local-shipping', text: 'check', action: 'ship'},
    {icon: 'chat', text: 'chat', action: 'chat'},
  ],
  receiveActions: [
    {icon: 'markunread-mailbox', text: 'check', action: 'receive'},
    {icon: 'chat', text: 'chat', action: 'chat'},
  ],
  lotteryPosterActions: [
    {icon: 'track-changes', text: 'result', action: 'result'},
    {icon: 'share', text: 'share', action: 'share'},
    // {icon: 'chat', text: 'chat', action: 'chat'},
    // {icon: 'local-shipping', text: 'check', action: 'ship'},
  ],
  lotteryWinnerActions: [
    {icon: 'track-changes', text: 'result', action: 'result'},
    {icon: 'share', text: 'share', action: 'share'},
    {icon: 'chat', text: 'chat', action: 'chat'},
    {icon: 'markunread-mailbox', text: 'check', action: 'receive'},
  ],
  userActions: [{icon: 'share', text: 'share', action: 'share'}],
  enterDraw: 'Win',
  availability: 'Availabality',
  lotteryAvailable: 'The lottery is currently available',
  lotteryNotAvailable: 'The lottery is not available',
  totalPrice: 'Total Price',
  collectedPrice: 'Collected Price',
  payToWin: 'Pay to win the lottery',
  currentLotteryUsers: 'Current lottery users',
  currentLotteryUsersNumber: lotteryUserIdsLength => {
    if (!lotteryUserIdsLength) {
      return 'No users have joined the lottery yet.';
    }
    if (lotteryUserIdsLength === 1) {
      return `${lotteryUserIdsLength} user has joined this lottery.`;
    }
    return `${lotteryUserIdsLength} users have joined this lottery.`;
  },
  winner: 'Winner',
  name: 'Name',
  description: 'Description',
  condition: 'Condition',
  category: 'Category',
  publishDate: 'Publish Date',
  location: 'Location',
  user: 'Owner',
  adId: 'Ad ID',
  emptyUserLotteries: 'User has no available lotteries',
  userLotteries: 'User Lotteries',
};

const home = {
  appName: 'Shell',
};

const importLottery = {
  sports: 'Sports',
  noNoticableScratches: 'No Noticable Scratches or Dirt',
  createLottery: 'Create a lottery',
  updateLottery: 'Update lottery',
  create: 'Create',
  update: 'Update',
  productName: 'Item name',
  adName: 'Name',
  description: 'Description',
  price: 'Price',
  images: 'Images',
  prefecture: 'Prefecture',
  city: 'City',
  category: 'Category',
  condition: 'Condition',
  enterCategory: 'Enter category',
  enterCondition: 'Enter condition',
  enterName: 'Enter name',
  enterDescription: 'Enter description',
  enterPrice: 'Enter price',
};

const lottteries = {
  lotteries: 'My joined lotteries',
  emptyLotteries: 'No Lotteries available.',
};

const receiveLottery = {
  receiveLottery: 'Receive Lottery',
  receivedLotteries: 'Received',
  notReceivedLotteries: 'Not Received',
  noReceivedLotteries: "You haven't received any lotteries yet.",
  announcement:
    "You are the winner of this lottery, but you haven't received it yet.\nPlease contact the owner and make sure that they ship the item.\nIf you have already received it, please mark it as received.",
};

const shipLottery = {
  shipLottery: 'Ship Lottery',
  shippedLotteries: 'Shipped',
  notShippedLotteries: 'Not Shipped',
  noShippedLotteries: "You haven't shipped any lotteries yet.",
  announcement:
    "You haven't shipped this lottery yet.\nThe winner of this lottery hasn't received the item yet.\nPlease contact the winner and make sure that they receive the item.\nAfter you ship the item, please mark the lottery as shipped.",
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

const chat = {
  chat: 'Chat',
  chatWithOwner: 'Chat with lottery owner',
  chatWithWinner: 'Chat with lottery winner',
  emptyChat: "You haven't sent any messages yet.",
  notReceived: 'Not Received',
  notShipped: 'Not Shipped',
  shipped: 'Already Shipped',
  received: 'Already Received',
  youHaveShipped: 'You have already shipped this item.',
  youHaveReceived: 'You have already received this item.',
  youWonThisLottery:
    "You won this lottery but you haven't received the item yet.\nPlease contact the owner and plan shipping procedures.",
  thereIsAWinner:
    "There is a winner for this lottery but you haven't shipped the item yet.\nPlease contact the winner and plan shipping procedures.",
};

const uploadAdProgress = {
  uploading: 'Currently Uploading',
  noItems: 'No lotteries are currently being uploaded.',
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
    'In order to verify your e-mail, we have sent you a verification link to your e-mail inbox.\nPlease check your inbox and verify your email.',
  howToUseTheApp: 'How to use the App',
  notifications: 'Notifications',
  paymentInformation: 'Payment information',
  // myAds: 'My Ads',
  myLotteries: 'My lotteries',
  myCreatedLotteries: 'My created lotteries',
  myLikedLotteries: 'My liked lotteries',
  myReceivedLotteries: 'My received lotteries',
  myShippedLotteries: 'My shipped lotteries',
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

const listItemActions = {
  cancel: 'Cancel',
  goToLotteryDetails: 'Go to lottery details',
  goToLotteryResults: 'Go to lotery results',
};

const userProfileLogoutActions = {
  logout: 'Logout',
  cancel: 'Cancel',
};

const searchBox = {
  searchQueryPlaceholder: 'What are you looking for?',
  searchQueryLabel: 'Search',
  toDatePlaceholder: 'yyyy/mm/dd',
  toDateLabel: 'To',
  fromDatePlaceholder: 'yyyy/mm/dd',
  fromDateLabel: 'From',
};

const filter = {
  filterLabel: 'Search',
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
  choosePhoto: 'Choose a profile image',
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
  lotteryDetails,
  home,
  importLottery,
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
  lotteryResult,
  successConfirmationModal,
  receiveLottery,
  chat,
  validationMessages,
  searchBox,
  listItemActions,
  filter,
  userProfileLogoutActions,
  shipLottery,
};
