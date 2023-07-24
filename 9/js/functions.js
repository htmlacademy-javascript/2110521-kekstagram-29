const calcMinInHour = timeInHour => {
  const timeParts = timeInHour.split(':');
  return Number(timeParts[0] * 60) + Number(timeParts[1]);
};

const checkWorkTime = (dayStart, dayEnd, meetingStart, duration) =>
  calcMinInHour(meetingStart) >= calcMinInHour(dayStart) &&
  calcMinInHour(meetingStart) + duration <= calcMinInHour(dayEnd);
/*
  console.log(checkWorkTime('08:00', '17:30', '14:00', 90));
  console.log(checkWorkTime('8:0', '10:0', '8:0', 120));
  console.log(checkWorkTime('8:00', '17:30', '08:00', 900)); */
