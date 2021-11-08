let lotteryItemCategories = {
  en: [
    'Electronic Devices',
    'Home Applicances',
    'Software',
    'Hardware',
    'Music',
    'Books & Magazines',
    'Movies & Videos',
    'Teacher Lessons',
    'Real Estate',
    'Vehicles',
    'Jobs',
    'Kids & Babies',
    'Beauty & Healthcare',
    'Tickets & Vouchers',
    'Office Supplies',
    'Gardening',
    'Fashion & Clothing',
    'Toys & Games',
    'Antique',
    'Art',
    'Sports',
  ].sort(),
  jp: [
    '電子デバイス',
    '家電',
    'ソフトウェア',
    'ハードウェア',
    '音楽',
    '本と雑誌',
    '映画とビデオ',
    '教師のレッスン',
    '不動産',
    '車両',
    'ジョブズ',
    'キッズ＆ベイビー',
    'ビューティー＆ヘルスケア',
    'チケットとバウチャー',
    '事務用品',
    '園芸',
    'ファッション＆衣料品',
    'Tおもちゃとゲーム',
    'アンティーク',
    '美術',
    'スポーツ',
  ].sort(),
};

lotteryItemCategories.en = [
  ...lotteryItemCategories.en.map(item => ({value: item})),
  {value: 'Other'},
];

lotteryItemCategories.jp = [
  ...lotteryItemCategories.jp.map(item => ({value: item})),
  {value: '他の'},
];

const lotteryItemTypes = {
  'Home Appliances': [],
  Computer: [
    'Computer',
    'Tablet',
    'Smart Phones',
    'Ebook Reader',
    'Digital Camera',
    'Peripheral Equipment',
    'Software',
    'Supply',
    'Parts',
    'Server',
    'Work Station',
    'PDA',
    'Pocket Computer',
    'Other',
  ],
  Music: [],
  'Books & Magazines': [],
  'Movies & Videos': [],
  'Teacher Lessons': [],
  'Real Estate': [],
  Vehicles: [],
  Pets: [],
  Jobs: [],
  'Kids & Babies': [],
  'Beauty & Healthcare': [],
  'Tickets & Vouchers': [],
  'Office Supplies': [],
  Gardening: [],
  'Fashion & Clothing': [],
  'Toys & Games': [],
  Antique: [],
  Art: [],
  Sports: [],
};

const mimeTypes = {
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
};

const lotteryItemConditions = {
  en: [
    'New',
    'Used',
    'Nearly Used',
    'No Noticable Scratches or Dirt',
    'Some Scratches & Dirt',
    'Overall Bad Condition',
    'Excellent',
    'Good',
    'Great',
  ]
    .sort()
    .map(item => ({value: item})),
  jp: [
    '新しい',
    '中古',
    'ほぼ使用済み',
    '目立った傷や汚れはありません',
    'いくつかの傷と汚れ',
    '全体的に悪い状態',
    '優秀な',
    '良い',
    '素晴らしい',
  ]
    .sort()
    .map(item => ({value: item})),
};

export {
  lotteryItemCategories,
  lotteryItemConditions,
  mimeTypes,
  lotteryItemTypes,
};
