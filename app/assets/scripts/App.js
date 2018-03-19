import $ from "jquery";

$(document).ready(() => {
  const $btnArr = $(".btn");

  $(".btn").on("click", setTime);
});

function setTime(event) {
  const $btn = $(event.target).closest("h4");
  const bText = $(".setting--b").text();
  const wText = $(".setting--w").text();
  let curTime = 0;

  if ($btn.attr("id")[0] === "b") {
    console.log(bText);
    curTime = bText + $btn.attr("id")[1] + "1";
    curTime = eval(curTime);
    if (curTime >= 1) {
      $(".setting--b").text(curTime);
    }
  } else if ($btn.attr("id")[0] === "w") {
    curTime = wText + $btn.attr("id")[1] + "1";
    curTime = eval(curTime);
    if (curTime >= 1) {
      $(".setting--w").text(curTime);
    }
  }
}