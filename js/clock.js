var t;

function stop() {clearInterval(t);}

function clock() {
  stop();
  printControls('clock');
  displayClock();
  t=setInterval(function(){displayClock()},1000);
}

function timer() {
  stop();
  printControls('timer');
}

function alarm() {
  stop();
  printControls('alarm');
}

function stopwatch() {
  stop();
  printControls('stopwatch');
  var data = {
  
    "clock" : "00:00:00"
  };
  printToOverlay(data);
}

function displayClock() {

  //first we fetch the actual time, and put it in an object
  var date_obj = new Date();
  var time = {
  
    "h" : date_obj.getHours(),
    "m" : date_obj.getMinutes(),
    "s" : date_obj.getSeconds(),
    "d" : date_obj.getDate(),
    "M" : date_obj.getMonth()+1,
    "y" : date_obj.getFullYear(),
  };

  // we add a zero in front of numbers<10
  checkTime(time);

  // we formats date and time to be printed
  var data = {
  
    "date" : time.d+"/"+time.M,
    "year" : "0"+time.y,
    "clock" : time.h+":"+time.m+":"+time.s
  };
  
  // check for hour, to show correct period of day (even if i'm running on 24-hour clock, I know ;)
  if(time.h<12) { data.am = "am" }
  else { data.pm = "pm" }

  printToOverlay(data);
}

function checkTime(obj) {
  for (value in obj) {
    if (obj[value]<10)
    {
      obj[value]="0" + obj[value];
    }
  }
}

function printToOverlay(data) {
  
  //reset am and pm (quick fix for when passing from morning to afternoon and having 2 overlays on)
  document.getElementById("am_overlay").innerHTML= "";
  document.getElementById("pm_overlay").innerHTML= "";

  for (value in data) {
    document.getElementById(value+'_overlay').innerHTML = data[value];
  }
}

function changeStyle(c) {
  document.getElementById("layout").className=c;
  document.getElementById("overlay").className=c+"_overlay";
  document.getElementById("controls").className=c;
  document.getElementById("footer").className=c;
}

var controlsId = ['top_left', 'top_middle', 'top_right', 'bottom_left', 'bottom_middle', 'bottom_right', 'mode_overlay'];

var clockLayout = ['alm', 'tim', 'stw', '', '', '', ''];
var clockCommands = ['alarm()', 'timer()', 'stopwatch()', '', '', ''];

var alarmLayout = ['/|\\', '/|\\', 'set', '\\|/', '\\|/', 'bck', 'alm'];
var alarmCommands = ['alert("plusH")', 'alert("plusM")', 'alert("setAlarm")', 'alert("minusH")', 'alert("minusM")', 'clock()', ''];

var timerLayout = ['/|\\', '/|\\', 'set', '\\|/', '\\|/', 'bck', 'tim'];
var timerCommands = ['alert("plusH")', 'alert("plusM")', 'alert("setTimer")', 'alert("minusH")', 'alert("minusM")', 'clock()', ''];

var stopwatchLayout = ['', '', '', 'go!', 'rst', 'bck', 'stw'];
var stopwatchCommands = ['', '', '', 'alert("start")', 'alert("reset")', 'clock()', ''];

function printControls(l) {
  var layout = window[l+"Layout"];
  var commands = window[l+"Commands"];
  
  for(var i=0;i<7;i++) {
    document.getElementById(controlsId[i]).innerHTML=layout[i];
    document.getElementById(controlsId[i]).setAttribute("onclick", commands[i]);
  }
}
