import dayjs from "dayjs";

export const generateTimeStr = (from, to) => {
  const startTime = getTime(from);

  const endTime = getTime(new Date(new Date(from).getTime() + (to * 60 * 1000) ))
  return `${startTime} - ${endTime}`
}

export const getTime = (time) => {
  return dayjs(time).format('HH:mm');
}

export const generateStopsStr = (stops) => {
  return String(stops).split(',').join(', ');
}

export const generateDurationStr = (duration) => {
  var hours = Math.floor(duration / 60);
  var minutes = duration % 60;
  return `${hours}ч ${minutes < 9 ? '0' + minutes : minutes}м`
}