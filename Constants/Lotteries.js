let lotteryItemCategories = [
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
  // 'Pets',
  'Jobs',
  // 'Kids & Babies',
  'Beauty & Healthcare',
  'Tickets & Vouchers',
  'Office Supplies',
  'Gardening',
  'Fashion & Clothing',
  'Toys & Games',
  'Antique',
  'Art',
  'Sports',
].sort();

lotteryItemCategories = [
  ...lotteryItemCategories.map(item => ({value: item})),
  {value: 'Other'},
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

const lotteryItemConditions = [
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
  .map(item => ({value: item}));

export {
  lotteryItemCategories,
  lotteryItemConditions,
  mimeTypes,
  lotteryItemTypes,
};
