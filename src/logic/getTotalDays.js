export default function getTotalDays(init, end) {
  var d = new Date();
  //   d.setDate(d.getDate() - 8);
  //   console.log(d - init);
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((end - init) / oneDay));
}
