const phoneNumbersRegexs = {
  Japan: /^(?:\d{10}|\d{3}-\d{3}-\d{4}|\d{2}-\d{4}-\d{4}|\d{3}-\d{4}-\d{4})$/,
  Lebanon: /^(961(3|70|71)|(03|70|71))\d{6}$/,
};

const emailsRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export {phoneNumbersRegexs, emailsRegex};
