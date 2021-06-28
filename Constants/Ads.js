let adCategories = [
  '',

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
  'Pets',
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
].sort();

adCategories = [...adCategories, 'Other'];

const adTypes = {
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

const adStatuses = [
  '',

  'New',
  'Used',
  'Nearly Used',
  'No Noticable Scratches or Dirt',
  'Some Scratches & Dirt',
  'Overall Bad Condition',
  'Excellent',
  'Good',
  'Great',
].sort();

export {adCategories, adStatuses, mimeTypes, adTypes};
