var t;

function loadWatch() {
  Clock();
  printControls('clock');
}

function Clock() {
  displayClock()
  t=setInterval(function(){displayClock()},1000);
}

function stopCurrent() {clearInterval(t);}


function displayClock() {

  //first we fetch the actual time
  var date_obj=new Date();
  var h=date_obj.getHours();
  var m=date_obj.getMinutes();
  var s=date_obj.getSeconds();
  var d=date_obj.getDate();
  var M=date_obj.getMonth()+1;
  var y=date_obj.getFullYear();
  var ampm;

  // add a zero in front of numbers<10
  h=checkTime(h);
  m=checkTime(m);
  s=checkTime(s);
  d=checkTime(d);
  M=checkTime(M);
  
  // check for hour (even if running on 24-hour clock, I know ;)
  if(h<12) { ampm = "am" }
  else {ampm = "pm" }
  
  // prints everything in the right place
  document.getElementById('date_overlay').innerHTML=d+"/"+M;
  document.getElementById('year_overlay').innerHTML="0"+y;
  document.getElementById('clock_overlay').innerHTML=h+":"+m+":"+s;
  document.getElementById("am_overlay").innerHTML= "";
  document.getElementById("pm_overlay").innerHTML= "";
  document.getElementById(ampm+"_overlay").innerHTML= ampm;
}

function checkTime(i) {
  if (i<10)
    {
    i="0" + i;
    }
  return i;
}

function changeStyle(c) {
  document.getElementById("layout").className=c;
  document.getElementById("overlay").className=c+"_overlay";
  document.getElementById("controls").className=c;
  document.getElementById("footer").className=c;
}

var controlsId = ['top_left', 'top_middle', 'top_right', 'bottom_left', 'bottom_middle', 'bottom_right', 'mode_overlay'];

var clockLayout = ['alm', 'tim', 'stw', '', '', '', ''];
var clockCommands = ['printControls("alarm")', 'printControls("timer")', 'printControls("stopwatch")', '', '', ''];

var alarmLayout = ['/|\\', '/|\\', 'set', '\\|/', '\\|/', 'bck', 'alm'];
var alarmCommands = ['alert("plusH")', 'alert("plusM")', 'alert("setAlarm")', 'alert("minusH")', 'alert("minusM")', 'printControls("clock")', ''];

var timerLayout = ['/|\\', '/|\\', 'set', '\\|/', '\\|/', 'bck', 'tim'];
var timerCommands = ['alert("plusH")', 'alert("plusM")', 'alert("setTimer")', 'alert("minusH")', 'alert("minusM")', 'printControls("clock")', ''];

var stopwatchLayout = ['', '', '', 'go!', 'rst', 'bck', 'stw'];
var stopwatchCommands = ['', '', '', 'alert("start")', 'alert("reset")', 'printControls("clock")', ''];

function printControls(l) {
  var layout = window[l+"Layout"];
  var commands = window[l+"Commands"];
  
  for(var i=0;i<7;i++) {
    document.getElementById(controlsId[i]).innerHTML=layout[i];
    document.getElementById(controlsId[i]).setAttribute("onclick", commands[i]);
  }
}
