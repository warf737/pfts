import { format, isValid, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const parseDateISOToString = value => {
  // console.log('parseDateISOToString', { value });
  const timezoneOffset = new Date().getTimezoneOffset();
  // console.log('parseDateISOToString', { timezoneOffset });

  const digit = timezoneOffset > 0 ? "-" : "+";
  const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
  const offsetMinutes = Math.abs(timezoneOffset) - offsetHours * 60;
  const timezoneString = `${digit}${
    offsetHours < 10 ? "0" : ""
  }${offsetHours}:${offsetMinutes < 10 ? "0" : ""}${offsetMinutes}`;
  // console.log('parseDateISOToString', { timezoneString });

  const date = utcToZonedTime(value, timezoneString);
  // console.log('parseDateISOToString', { date });
  if (isValid(date)) {
    const dateString = format(date, "dd.MM.yyyy г. HH:mm:ss");
    // console.log('parseDateISOToString', { dateString });
    return dateString;
  }
  return null;
};

export const parseDateString = value => {
  if (!`${value}`.match(/^(\d{4})-(\d{2})-(\d{2})/)) return null;

  const parsed = parseISO(value);
  const timezoneOffset = new Date().getTimezoneOffset();

  const digit = timezoneOffset > 0 ? "-" : "+";
  const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
  const offsetMinutes = Math.abs(timezoneOffset) - offsetHours * 60;
  const timezoneString = `${digit}${
    offsetHours < 10 ? "0" : ""
  }${offsetHours}:${offsetMinutes < 10 ? "0" : ""}${offsetMinutes}`;

  const date = utcToZonedTime(parsed, timezoneString);

  if (!isValid(date)) return null;
  return date;
};
