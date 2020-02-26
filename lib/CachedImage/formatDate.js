import {months} from '../../Constants/Dates';

const formatDate = date => {
  const newDate = new Date(date);

  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;

  const day = newDate.getDate();
  const monthIndex = newDate.getMonth();
  const year = newDate.getFullYear();

  return `${months[monthIndex]} ${day}, ${year} at ${strTime}`;
};

export default formatDate;
