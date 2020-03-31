export default function getTotalDays(data) {
  var time = data.reduce((accumulator, currentValue) => {
    if (currentValue.ctrl.show === false) {
      return accumulator + (currentValue.ctrl.final - currentValue.ctrl.inicio);
    } else {
      return accumulator;
    }
  }, 0);

  // time = 6001000;

  var hours = 0;
  var minutes = 0;
  var seconds = 0;

  var dateObj = new Date(time);
  hours = dateObj.getUTCHours();
  minutes = dateObj.getUTCMinutes();
  seconds = dateObj.getSeconds();

  let resultTime = "";

  if (hours !== 0) {
    resultTime += hours + " hora";
    if (hours > 1) resultTime += "s";
  }

  if (minutes !== 0) {
    resultTime += ", " + minutes + " minuto";
    if (minutes > 1) resultTime += "s";
  }

  if (seconds !== 0) {
    resultTime += ", " + seconds + " segundo";
    if (seconds > 1) resultTime += "s";
  }

  // console.log(hours, minutes, seconds, resultTime);

  return resultTime;
}
