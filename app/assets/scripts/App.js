import Timer from "easytimer.js";
import $ from "jquery";

const timer = new Timer();

let mode = true;

$(document).ready(() => {
  $(".btn").on("click", setTime);
  $("#startStopBtn").on("click", startStop);
  $("#pause").on("click", pause);
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
        if (!(mode)) {
          $(".time_display").text(curTime);
        }
      }
    } else if ($btn.attr("id")[0] === "w") {
      curTime = wText + $btn.attr("id")[1] + "1";
      curTime = eval(curTime);
      if (curTime >= 1) {
        $(".setting--w").text(curTime);
        if (mode) {
          $(".time_display").text(curTime);
        }
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
    if (mode) {
      $time.text($(".setting--w").text());
    } else {
      $time.text($(".setting--b").text());
    }
    $(".container_clock").removeClass('spinner-work');
    $(".container_clock").removeClass('spinner-break');
  } else {
    timer.start({
      countdown: true,
      startValues: {
        seconds: parseInt($time.text()) * 60
      }
    });

    $ssBtn.text("Stop");

    if (mode) {
      $(".container_clock").addClass('spinner-work');
      $(".container_clock").removeClass('spinner-work-paused');
    } else {
      $(".container_clock").addClass('spinner-break');
      $(".container_clock").removeClass('spinner-break-paused');
    }

    timer.addEventListener('secondsUpdated', function(e) {
      const timerVal = timer.getTimeValues().toString();
      $('.time_display').html(timerVal);

      if (timerVal === "00:00:00") {
        timer.stop();
        $ssBtn.text("Start");
        if (mode) {
          $time.text($(".setting--b").text())
          $(".time_title").text("Break");
          $(".container_clock").addClass('spinner-break');
          $(".container_clock").removeClass('spinner-work');
          mode = false;
        } else {
          $time.text($(".setting--w").text())
          $(".time_title").text("Work");
          $(".container_clock").addClass('spinner-work');
          $(".container_clock").removeClass('spinner-break');
          mode = true;
        }
        startStop();
      }
    });
  }
}

function pause() {
  timer.pause();
  $("#startStopBtn").text("Resume");
  if (mode) {
    $(".container_clock").removeClass("spinner-work");
    $(".container_clock").addClass("spinner-work-paused");
  } else {
    $(".container_clock").removeClass("spinner-break");
    $(".container_clock").addClass("spinner-break-paused");
  }
}