export default function getTotalDays(init, end, rentConf) {
  const oneDay = 24 * 60 * 60 * 1000;
  var days = Math.round(Math.abs((end - init) / oneDay) - rentConf.days);
  if (days <= 0) {
    return "";
  } else {
    return "Penalty: $" + days * rentConf.penalty + ".00 (" + days + ") days";
  }
}
