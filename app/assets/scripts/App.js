import Timer from "easytimer.js";
import $ from "jquery";

const timer = new Timer();
let mode = "work";

$(document).ready(() => {
  $(".btn").on("click", setTime);
  $("#startStopBtn").on("click", startStop);
  $("#stop").on("click", () => {
    timer.pause();
    $("#startStopBtn").text("Resume");
  });
});

function setTime(event) {
  if ($("#startStopBtn").text() === "Start") {
    const $btn = $(event.target).closest("h4");
    const bText = $(".setting--b").text();
    const wText = $(".setting--w").text();
    let curTime = 0;

    if ($btn.attr("id")[0] === "b") {
      curTime = bText + $btn.attr("id")[1] + "1";
      curTime = eval(curTime);
      if (curTime >= 1) {
        $(".setting--b").text(curTime);
        if (mode === "break") {
          $(".time_display").text(curTime);
        }
      }
    } else if ($btn.attr("id")[0] === "w") {
      curTime = wText + $btn.attr("id")[1] + "1";
      curTime = eval(curTime);
      if (curTime >= 1) {
        $(".setting--w").text(curTime);
        if (mode === "work") {}
        $(".time_display").text(curTime);
      }
    }
  }
}


function startStop() {
  const $time = $(".time_display");
  const $ssBtn = $("#startStopBtn")

  if ($ssBtn.text() === "Stop") {
    timer.stop();
    $ssBtn.text("Start");
    if (mode === "work") {
      $time.text($(".setting--w").text());
    } else {
      $time.text($(".setting--b").text());
    }
  } else {
    timer.start({
      countdown: true,
      startValues: {
        seconds: parseInt($time.text()) * 60
      }
    });
    $ssBtn.text("Stop");
  }

  timer.addEventListener('secondsUpdated', function(e) {
    $('.time_display').html(timer.getTimeValues().toString());

  });
  timer.addEventListener('started', function(e) {
    $('.time_display').html(timer.getTimeValues().toString());
  });
  timer.addEventListener('targetAchieved', function(e) {
    if (mode === "work") {
      timer.stop();
      $time.text($(".setting--b").text())
      $ssBtn.text("Start");
      $(".time_title").text("Break");
      mode = "break";
      startStop();
    } else {
      timer.stop();
      $time.text($(".setting--w").text())
      $ssBtn.text("Start");
      $(".time_title").text("Work");
      mode = "work";
      startStop();
    }
  });
}