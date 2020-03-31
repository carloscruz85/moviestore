// import minimalStringFilter from "./minimalStringFilter";

export default function filterlacas(titleR, searchFilterR) {
  // console.log(titleR);

  let title = titleR.toLowerCase().split(" ");
  let searchFilter = searchFilterR.toLowerCase().split(" ");
  var count = 0;

  // //explode searchers terms
  title.filter(titlePart => {
    for (var j = 0; j < searchFilter.length; j++) {
      // console.log(
      //   titlePart,
      //   searchFilter[j],
      //   titlePart.includes(searchFilter[j])
      // );
      // console.log(titlePart.includes(searchFilter[j]));
      if (titlePart.includes(searchFilter[j]) === true) count++;
      console.log("count ", count);

      // console.log(titlePart.some(searchFilter[j]));

      // if (title.some(searchFilter[j])) count++;
    }
    // if (count === searchFilter.length) return placa;
  });

  if (count === title.length) {
    console.log("count ", count, title.length);

    return true;
  } else return false;
}
