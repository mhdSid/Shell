const months = {
  en: [
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
  ],
  jp: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '六月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
};
const monthsNumbers = {
  en: {
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
  },
  jp: {
    '1月': '1',
    '2月': '2',
    '3月': '3',
    '4月': '4',
    '5月': '5',
    六月: '6',
    '7月': '7',
    '8月': '8',
    '9月': '9',
    '10月': '10',
    '11月': '11',
    '12月': '12',
  },
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
