import { parseDateString } from "./parseDateString";

const leadZero = val => `0${val}`.slice(-2);

const date = value => {
  const result = parseDateString(value);

  if (!result) return value;
  return `${leadZero(result.getDate())}.${leadZero(
    result.getMonth() + 1
  )}.${result.getFullYear()}`;
};

const datetime = value => {
  const result = parseDateString(value);
  if (!result) return value;
  return `${leadZero(result.getDate())}.${leadZero(
    result.getMonth() + 1
  )}.${result.getFullYear()} ${leadZero(result.getHours())}:${leadZero(
    result.getMinutes()
  )}:${leadZero(result.getSeconds())}`;
};

export default { date, datetime };
