const about = {
  en: {
    howTo: 'How to use the App',
    sell: 'Sell',
    howToUseFirst:
      'Make a lottery about the item you want to sell - it could be anything you can think about!',
    howToUseSecond:
      'Users enter the lottery by paying a fee of ¥100 to have a chance to win the item that you have upload.',
    howToUseThird: '10% of the fee amount is used to sponsor and fund NGOs.',
    howToUseFourth:
      '40% of the fee amount goes to our company to continue running this service.',
    howToUseFifth: 'The rest 50% of the fee amount is added to the lottery.',
    howToUseSixth:
      'When the total monetary value in the lottery is equal to the price of your item, then our system randomly selects a winner.',
    howToUseSeventh:
      'The winner collects the item and you own the collected price value of your item.',
    or: 'Or',
    browse: 'Browse',
    howtoUseEigtth: 'Browse through a wide variety of uploaded items!',
    choose: 'Choose',
    howToUseNineth:
      'Make sure you choose any item you love. It can be a Smart Phone, a Laptop, a Car, a House, or anything you can think about.',
    howToUseTenth:
      'Pay a fee of ¥100 to enter a lottery and have a chance to win any item of your choice.\n\n 20% of the fee amount is used to sponsor and fund NGOs.\n\n 30% of the fee amount goes to our company to continue running this service.\n\n The rest 50% of the fee amount is added to the lottery.',
    howToUseEleventh:
      'When the total monetary value in the lottery is equal to the price of your chosen item, then our system randomly selects a winner.',
    enterLottery: 'Enter Lottery',
    joinLottery: 'Join Lottery',
  },
  jp: {
    howTo: 'アプリの使い方',
    sell: '売る',
    howToUseFirst:
      'あなたが売りたいアイテムについて宝くじを作ってください-それはあなたが考えることができるものなら何でもありえます！',
    howToUseSecond:
      'ユーザーは100円の手数料を払って宝くじに参加し、アップロードしたアイテムを獲得するチャンスがあります。',
    howToUseThird: '料金の10％は、NGOのスポンサーと資金提供に使用されます。',
    howToUseFourth:
      'このサービスを継続するために、手数料の40％が当社に支払われます。',
    howToUseFifth: '残りの50％は抽選に加算されます。',
    howToUseSixth:
      '宝くじの合計金額がアイテムの価格と等しい場合、システムはランダムに勝者を選択します。',
    howToUseSeventh:
      '勝者はアイテムを収集し、あなたはアイテムの収集された価格値を所有します。',
    or: 'または',
    browse: 'ブラウズ',
    howtoUseEigtth: 'アップロードされたさまざまなアイテムを閲覧してください！',
    choose: '選ぶ',
    howToUseNineth:
      'あなたが好きなアイテムを選ぶことを確認してください。 それは、スマートフォン、ラップトップ、車、家、またはあなたが考えることができるものなら何でもかまいません。',
    howToUseTenth:
      '宝くじに参加して任意のアイテムを獲得するチャンスを得るには、100円の手数料を支払います。\n\n 手数料額の20％は、NGOのスポンサーと資金提供に使用されます。\n\n 手数料額の30％ このサービスを継続するために当社に行きます。\n\n 料金の残りの50％が宝くじに追加されます。',
    howToUseEleventh:
      '宝くじの合計金額が選択したアイテムの価格と等しい場合、システムはランダムに勝者を選択します。',
    enterLottery: '宝くじに入る',
    joinLottery: '宝くじに参加する',
  },
};

const errors = {
  en: {
    error: 'A error has occured. Please try again.',
  },
  jp: {
    error: 'エラーが発生しました。 もう一度やり直してください。',
  },
};

const successConfirmationModal = {
  en: {
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
  },
  jp: {
    importLottery: {
      title: 'あなたの宝くじが作成されました！',
      subtitle:
        'これで、ユーザーが宝くじに参加するまで待つことができます。 その間、アプリを閲覧し続けます。',
      actions: {
        continueBrowsing: {
          text: 'ブラウジングを続ける',
          icon: 'home',
        },
        createAnotherLottery: {
          text: '別の宝くじを作成する',
          icon: 'add',
        },
      },
    },
    payment: {
      title: 'あなたはこの宝くじにうまく参加しました！',
      subtitle:
        'これで、他のユーザーがこの宝くじに参加し、宝くじの価格が収集された後、結果を待つことができます。 その間、同じ抽選に好きなだけ参加できますのでご注意ください。',
      actions: {
        joinAgain: {
          text: '再び宝くじに参加する',
          icon: 'repeat',
        },
        goBack: {
          text: '宝くじの詳細に戻る',
          icon: 'chevron-left',
        },
      },
    },
  },
};

const lotteryResult = {
  en: {
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
  },
  jp: {
    lotteryResult: '抽選結果',
    actionOptions: {
      chat: 'chat',
      receive: 'receive',
      ship: 'ship',
    },
    lotteryWinnerActions: [
      {icon: 'chat', text: 'オーナーとチャットする', action: 'chat'},
      {icon: 'markunread-mailbox', text: '受け取る', action: 'receive'},
    ],
    lotteryPosterActions: [
      {icon: 'chat', text: '勝者とチャットするr', action: 'chat'},
      {icon: 'local-shipping', text: '送る', action: 'ship'},
    ],
    congratulations: 'おめでとう！',
  },
};

const validationMessages = {
  en: {
    search: {
      searchQuery: 'Search text length should be between 2 and 100 characters.',
      toDate: 'To date should be formatted like yyyy/mm/dd',
      fromDate: 'From date should be formatted like yyyy/mm/dd',
      fromDateLessThanToDate: 'From date should be less than To date',
      toDateGreaterThanFromDate: 'To date should be greater than From date',
    },
    importLottery: {
      adName: 'Lottery name length should be between 5 and 30 characters.',
      description:
        'Lottery description length should be between 20 and 500 characters.',
      price: 'Price should be be divisble by 100',
    },
    loginSignup: {
      email: 'Please enter a valid email.',
      password: 'Password length should be between 6 and 50 characters.',
    },
    changePassword: {
      currentPassword: 'The entered password does not match your current one.',
      newPassword:
        'New password should be diferent than your current one and length should be between 6 and 50 characters.',
    },
  },
  jp: {
    search: {
      searchQuery: '検索テキストの長さは2〜100文字である必要があります。',
      toDate:
        '現在までは、yyyy / mm / ddのようにフォーマットする必要があります',
      fromDate: '開始日はyyyy / mm / ddのようにフォーマットする必要があります',
      fromDateLessThanToDate: '開始日は終了日よりも短くする必要があります',
      toDateGreaterThanFromDate: '終了日は開始日よりも大きい必要があります',
    },
    importLottery: {
      adName: '宝くじの名前の長さは5〜30文字にする必要があります。',
      description: '宝くじの説明の長さは20〜500文字である必要があります。',
      price: '価格は100で割り切れる必要があります',
    },
    loginSignup: {
      email: '正しいメールアドレスを入力してください。',
      password: 'パスワードの長さは6〜50文字である必要があります。',
    },
    changePassword: {
      currentPassword: '入力したパスワードが現在のパスワードと一致しません。',
      newPassword:
        '新しいパスワードは現在のパスワードとは異なり、長さは6〜50文字である必要があります。',
    },
  },
};

const lotteryDetails = {
  en: {
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
    currentLotteryUsersNumber: lotteryUsersLength => {
      if (!lotteryUsersLength) {
        return 'No users have joined the lottery yet.';
      }
      if (lotteryUsersLength === 1) {
        return `${lotteryUsersLength} user has joined this lottery.`;
      }
      return `${lotteryUsersLength} users have joined this lottery.`;
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
  },
  jp: {
    cancelLottery: '宝くじのキャンセル',
    reAddLottery: '宝くじを読んだ',
    shareLottery: '宝くじを共有する',
    areYouSureShare: '共有',
    cancelThisLottery: 'この宝くじをキャンセルする',
    reAddThisLottery: 'この宝くじを読む',
    close: '選ぶ',
    areYouSureCancel:
      'この宝くじをキャンセルしようとしています。 キャンセルしてもよろしいですか？',
    areYouSureReAdd:
      'この宝くじを再び利用できるようにしようとしています。 続行してもよろしいですか？',
    inProgress: 'この宝くじはまだ進行中です。',
    winnerAccouncementSoon: '受賞者の発表にはしばらくお待ちください。',
    youAreTheWinner: 'あなたはこの宝くじの当選者です！',
    lotteryPosterWinner: '宝くじの賞金は勝者に行きます',
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
    cancelled: 'キャンセル',
    cancelledOn: 'キャンセル ',
    like: {icon: 'favorite-border', text: 'お気に入り', action: 'like'},
    cancelActions: [{icon: 'cancel', text: 'キャンセル', action: 'cancel'}],
    reAddActions: [{icon: 'check', text: 'アドオンの再', action: 'readd'}],
    dislike: {icon: 'favorite', text: '嫌い', action: 'dislike'},
    visitorActions: [
      {icon: 'shop', text: '勝つ', action: 'win'},
      {icon: 'share', text: '共有', action: 'share'},
      {icon: 'track-changes', text: '結果', action: 'result'},
    ],
    shipActions: [
      {icon: 'local-shipping', text: 'チェック', action: 'ship'},
      {icon: 'chat', text: 'チャット', action: 'chat'},
    ],
    receiveActions: [
      {icon: 'markunread-mailbox', text: 'チェック', action: 'receive'},
      {icon: 'chat', text: 'チャット', action: 'chat'},
    ],
    lotteryPosterActions: [
      {icon: 'track-changes', text: '結果', action: 'result'},
      {icon: 'share', text: '共有', action: 'share'},
      // {icon: 'chat', text: 'chat', action: 'chat'},
      // {icon: 'local-shipping', text: 'check', action: 'ship'},
    ],
    lotteryWinnerActions: [
      {icon: 'track-changes', text: '結果', action: 'result'},
      {icon: 'share', text: '共有', action: 'share'},
      {icon: 'chat', text: 'チャット', action: 'chat'},
      {icon: 'markunread-mailbox', text: 'アドオンの再', action: 'receive'},
    ],
    userActions: [{icon: 'share', text: '共有', action: 'share'}],
    enterDraw: '勝つ',
    availability: '可用性',
    lotteryAvailable: '抽選は現在ご利用いただけます',
    lotteryNotAvailable: '宝くじはご利用いただけません',
    totalPrice: '合計金額',
    collectedPrice: '徴収価格',
    payToWin: '宝くじに当選するために支払う',
    currentLotteryUsers: '現在の宝くじユーザー',
    currentLotteryUsersNumber: lotteryUsersLength => {
      if (!lotteryUsersLength) {
        return 'まだ宝くじに参加しているユーザーはいません。';
      }
      if (lotteryUsersLength === 1) {
        return `${lotteryUsersLength} 人のユーザーがこの宝くじに参加しました。`;
      }
      return `${lotteryUsersLength} 人のユーザーがこの宝くじに参加しました。`;
    },
    winner: '勝者',
    name: '名前',
    description: '説明',
    condition: '状態',
    category: 'カテゴリー',
    publishDate: '公開日',
    location: '位置',
    user: 'オーナー',
    adId: '広告ID',
    emptyUserLotteries: 'ユーザーは利用可能な宝くじを持っていません',
    userLotteries: 'ユーザー宝くじ',
  },
};

const home = {
  en: {
    appName: 'Shell',
  },
  jp: {
    appName: 'シェル',
  },
};

const importLottery = {
  en: {
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
  },
  jp: {
    sports: 'スポーツ',
    noNoticableScratches: '目立った傷や汚れはありません',
    createLottery: '宝くじを作成する',
    updateLottery: '宝くじを更新する',
    create: '作成',
    update: 'アップデート',
    productName: '項目名',
    adName: '名前',
    description: '説明',
    price: '価格',
    images: '画像',
    prefecture: '県',
    city: '市',
    category: 'カテゴリー',
    condition: '状態',
    enterCategory: 'カテゴリを入力してください',
    enterCondition: '条件を入力してください',
    enterName: '名前を入力',
    enterDescription: '説明を入力してください',
    enterPrice: '価格を入力してください',
  },
};

const lottteries = {
  en: {
    lotteries: 'Joined lotteries',
    emptyLotteries: 'No Lotteries available.',
  },
  jp: {
    lotteries: '宝くじに参加しました',
    emptyLotteries: '宝くじはありません。',
  },
};

const receiveLottery = {
  en: {
    receiveLottery: 'Receive Lottery',
    receivedLotteries: 'Received',
    notReceivedLotteries: 'Not Received',
    noReceivedLotteries: "You haven't received any lotteries yet.",
    announcement:
      "You are the winner of this lottery, but you haven't received it yet.\nPlease contact the owner and make sure that they ship the item.\nIf you have already received it, please mark it as received.",
  },
  jp: {
    receiveLottery: '宝くじを受け取る',
    receivedLotteries: '受け取った',
    notReceivedLotteries: '受信していない',
    noReceivedLotteries: 'まだ宝くじを受け取っていません。',
    announcement:
      'あなたはこの宝くじの当選者ですが、まだ受け取っていません。\n所有者に連絡して、商品が発送されていることを確認してください。\nすでに受け取っている場合は、受け取ったとマークしてください。',
  },
};

const shipLottery = {
  en: {
    shipLottery: 'Ship Lottery',
    shippedLotteries: 'Shipped',
    notShippedLotteries: 'Not Shipped',
    noShippedLotteries: "You haven't shipped any lotteries yet.",
    announcement:
      "You haven't shipped this lottery yet.\nThe winner of this lottery hasn't received the item yet.\nPlease contact the winner and make sure that they receive the item.\nAfter you ship the item, please mark the lottery as shipped.",
  },
  jp: {
    shipLottery: '船の宝くじ',
    shippedLotteries: '出荷済み',
    notShippedLotteries: '出荷されていません',
    noShippedLotteries: '宝くじはまだ発送されていません。',
    announcement:
      'この宝くじはまだ発送されていません。\nこの宝くじの当選者はまだ商品を受け取っていません。\n当選者に連絡して、商品が届いていることを確認してください。\n商品を発送したら、宝くじに発送済みのマークを付けてください。 。',
  },
};

const myyAds = {
  myAds: 'My Ads',
};

const myyLotteries = {
  en: {
    myLotteries: 'My Lotteries',
  },
  jp: {
    myLotteries: '私の宝くじ',
  },
};

const noAuth = {
  en: {
    loginSingup: 'Please login or signup to add a new item.',
    importLottery: 'Please login or signup to create a new lottery.',
    chat: 'Please login or signup to create a new lottery.',
    userJoinedLotteries: 'Please login or signup to create a new lottery.',
  },
  jp: {
    loginSingup:
      '新しいアイテムを追加するには、ログインまたはサインアップしてください。',
    importLottery:
      '新しい宝くじを作成するには、ログインまたはサインアップしてください。',
    chat:
      '新しい宝くじを作成するには、ログインまたはサインアップしてください。',
    userJoinedLotteries:
      '新しい宝くじを作成するには、ログインまたはサインアップしてください。',
  },
};

const loginSingup = {
  en: {
    loginSingup: 'Login / Sign up',
  },
  jp: {
    loginSingup: 'ログイン / サインアップ',
  },
};

const login = {
  en: {
    login: 'Login',
  },
  jp: {
    login: 'ログイン',
  },
};

const signUp = {
  en: {
    signUp: 'Sign up',
  },
  jp: {
    signUp: 'サインアップ',
  },
};

const notifications = {
  en: {
    notifications: 'Notifications',
  },
  jp: {
    notifications: '通知',
  },
};

const chat = {
  en: {
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
  },
  jp: {
    chat: 'チャット',
    chatWithOwner: '宝くじの所有者とチャットする',
    chatWithWinner: '宝くじの当選者とチャットする',
    emptyChat: 'まだメッセージを送信していません。',
    notReceived: '受信していない',
    notShipped: '出荷されていません',
    shipped: 'すでに出荷されています',
    received: '既に受信',
    youHaveShipped: 'あなたはすでにこのアイテムを出荷しました。',
    youHaveReceived: 'あなたはすでにこのアイテムを受け取りました。',
    youWonThisLottery:
      'この宝くじに当選しましたが、まだ商品を受け取っていません。\n所有者に連絡して、配送手順を計画してください。',
    thereIsAWinner:
      'この宝くじの当選者はいますが、まだ商品を発送していません。\n当選者に連絡して、発送手順を計画してください。',
  },
};

const uploadAdProgress = {
  en: {
    uploading: 'Currently Uploading',
    noItems: 'No lotteries are currently being uploaded.',
  },
  jp: {
    uploading: '現在アップロード中',
    noItems: '現在、宝くじはアップロードされていません。',
  },
};

const paymentInformation = {
  en: {
    paymentInformation: 'Payment Information',
    submit: 'Save',
    creditCard: 'Credit Card',
  },
  jp: {
    paymentInformation: '支払情報',
    submit: '保存する',
    creditCard: 'クレジットカード',
  },
};

const profile = {
  en: {
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
    resend: 'Resend Code',
    checkYourInbox:
      'In order to verify your e-mail, we have sent you a verification link to your e-mail inbox.\nPlease check your inbox and verify your email.',
    howToUseTheApp: 'How to use the App',
    notifications: 'Notifications',
    paymentInformation: 'Payment information',
    // myAds: 'My Ads',
    myLotteries: 'My lotteries',
    myCreatedLotteries: 'My created lotteries',
    myLikedLotteries: 'Favorites',
    myReceivedLotteries: 'Received',
    myShippedLotteries: 'Shipped',
    personal: 'Personal',
    settings: 'Settings',
    logout: 'Logout',
    info: 'Info',
    email: 'Email',
    password: 'Password',
    verificationSubTitle:
      'Please enter the verification code that we sent to your email address',
  },
  jp: {
    japan: '日本',
    male: '男',
    female: '女性',
    initialYear: '2020',
    initialMonth: '4月',
    initialDay: '01',
    points: 'ポイント',
    firstName: 'ファーストネーム',
    lastName: '苗字',
    phoneNumber: '電話番号',
    mobile: 'モバイル',
    enterEmail: 'メールアドレスを入力して',
    enterPassword: 'パスワードを入力する',
    gender: '性別',
    loginOrSignup: 'ログインまたはサインアップ',
    dateOfBirth: '生年月日',
    country: '国',
    postalCode: '郵便番号',
    prefecture: '県',
    city: '市',
    agreePriacyPolicy: 'プライバシーポリシーに同意する',
    enterPrefecture: '県に入る',
    enterCity: '都市に入る',
    cityWard: '市区町村',
    fullAddress: '完全な住所',
    fillInformationCorrectly:
      '販売/獲得プロセスに影響するため、この必要な情報をすべて正しく入力してください。',
    signUp: 'サインアップ',
    shellSignUp: 'シェルにサインアップ',
    verifyAccount: 'アカウントを確認する',
    verify: '確認',
    resend: 'コードを再送する',
    checkYourInbox:
      '電子メールを確認するために、電子メールの受信ボックスへの確認リンクを送信しました。 n受信ボックスを確認して、電子メールを確認してください。',
    howToUseTheApp: 'アプリの使い方',
    notifications: '通知',
    paymentInformation: '支払情報',
    // myAds: 'My Ads',
    myLotteries: '私の宝くじ',
    myCreatedLotteries: '私が作成した宝くじ',
    myLikedLotteries: 'お気に入り',
    myReceivedLotteries: '受け取った',
    myShippedLotteries: '出荷済み',
    personal: '個人的',
    settings: '設定',
    logout: 'ログアウト',
    info: '情報',
    email: 'Eメール',
    password: 'パスワード',
    verificationSubTitle:
      'メールアドレスに送信した確認コードを入力してください',
  },
};

const searchh = {
  en: {
    search: 'Search',
  },
  jp: {
    search: '検索',
  },
};

const listItemActions = {
  en: {
    cancel: 'Cancel',
    goToLotteryDetails: 'Go to lottery details',
    goToLotteryResults: 'Go to lotery results',
  },
  jp: {
    cancel: 'キャンセル',
    goToLotteryDetails: '宝くじの詳細に移動',
    goToLotteryResults: '宝くじの結果に移動します',
  },
};

const userProfileLogoutActions = {
  en: {
    logout: 'Logout',
    cancel: 'Cancel',
  },
  jp: {
    logout: 'ログアウト',
    cancel: 'キャンセル',
  },
};

const searchBox = {
  en: {
    searchQueryPlaceholder: 'What are you looking for?',
    searchQueryLabel: 'Search',
    toDatePlaceholder: 'yyyy/mm/dd',
    toDateLabel: 'To',
    fromDatePlaceholder: 'yyyy/mm/dd',
    fromDateLabel: 'From',
  },
  jp: {
    searchQueryPlaceholder: '何を探していますか？',
    searchQueryLabel: '検索',
    toDatePlaceholder: 'yyyy/mm/dd',
    toDateLabel: 'に',
    fromDatePlaceholder: 'yyyy/mm/dd',
    fromDateLabel: 'から',
  },
};

const filter = {
  en: {
    filterLabel: 'Search',
  },
  jp: {
    filterLabel: '検索',
  },
};

const settings = {
  en: {
    settings: 'Settings',
    changePassword: 'Change Password',
    language: 'Language',
    privacy: 'Privacy',
    privacyAndTerms: 'Terms and Privacy Policy',
    contactUs: 'Contact Us',
    security: 'Security',
    faq: 'FAQ',
    licenses: 'Licenses',
    en: 'en',
    jp: 'jp',
    english: 'English',
    japanese: 'Japanese',
    version: 'Version',
  },
  jp: {
    settings: '設定',
    changePassword: 'パスワードを変更する',
    language: '言語',
    privacy: 'プライバシー',
    privacyAndTerms: '利用規約とプライバシーポリシー',
    contactUs: 'お問い合わせ',
    security: '安全',
    faq: 'よくある質問',
    licenses: 'ライセンス',
    en: 'en',
    jp: 'jp',
    english: '英語',
    japanese: '日本',
    version: 'バージョン',
  },
};

const updateUserr = {
  en: {
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
  },
  jp: {
    updateProfile: 'プロファイルの更新',
    choosePhoto: 'プロフィール画像を選択',
    save: '保存する',
    firstName: 'ファーストネーム',
    lastName: '苗字',
    phoneNumber: '電話番号',
    mobile: 'モバイル',
    country: '国',
    postalCode: '郵便番号',
    prefecture: '県',
    city: '市',
    cityWard: '市区町村',
    fullAddress: '完全な住所',
    confirm: '確認',
    japan: '日本',
    passsword: 'パスワード',
    currentPassword: '現在のパスワード',
    newPassword: '新しいパスワード',
    update: 'アップデート',
  },
};

const userDetails = {
  en: {
    name: 'Name',
    email: 'Email',
    location: 'Location',
    postalCode: 'Postal Code',
    cityWard: 'City / Ward',
    fullAddress: 'Full Address',
    userId: 'User ID',
    mobile: 'Mobile',
  },
  jp: {
    name: '名前',
    email: 'Eメール',
    location: '位置',
    postalCode: '郵便番号',
    cityWard: '市/区',
    fullAddress: '完全な住所',
    userId: 'ユーザーID',
    mobile: 'モバイル',
  },
};

const payment = {
  en: {
    title: 'Get a Chance to Win',
    submit: 'Pay fee of ¥100',
    cancel: 'Cancel',
    joinLottery: 'Join lottery',
    fee: '¥100.00',
    total: 'Total',
    joinLotteryFee: 'Join lottery fee',
    tax: 'Tax',
    taxFee: '00.00',
  },
  jp: {
    title: '勝つチャンスを手に入れよう',
    submit: '手数料100円',
    cancel: 'キャンセル',
    joinLottery: '宝くじに参加する',
    fee: '¥100.00',
    total: '合計',
    joinLotteryFee: '宝くじに参加する',
    tax: '税',
    taxFee: '00.00',
  },
};

const uploadProgress = {
  en: {
    inProgress: length => `Uploading ${length} ${length > 1 ? 'Ads' : 'Ad'}`,
    uploadPgress: 'Upload in progress',
  },
  jp: {
    inProgress: length => `アップロード ${length} 広告`,
    uploadPgress: 'アップロード中',
  },
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
  // orLogin,
  // orSignUp,
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
