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
// for (let i = 1; i <= 12; i += 1) {
//   months = [...months, `${i}`];
// }

let days = [];
for (let i = 1; i <= 31; i += 1) {
  days = [...days, `${i}`];
}

let years = [];
for (let i = 1940; i <= 2020; i += 1) {
  years = [...years, `${i}`];
}

export {months, days, years};
