const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const monthsNumbers = {
  January: '1',
  February: '2',
  March: '3',
  April: '4',
  May: '5',
  June: '6',
  July: '7',
  August: '8',
  September: '9',
  October: '10',
  November: '11',
  December: '12',
};

let days = [];
for (let i = 1; i <= 31; i += 1) {
  days = [...days, `${i}`];
}

let years = [];
for (let i = 1940; i <= 2020; i += 1) {
  years = [...years, `${i}`];
}

export {months, days, years, monthsNumbers};
