var t;

function loadWatch() {
	startTime();
	printControls('main');
}

function startTime() {
	displayTime();
	t=setInterval(function(){displayTime()},1000);
}

function stopTime() {clearInterval(t);}


function displayTime() {
	var today=new Date();
  var h=today.getHours();
	var m=today.getMinutes();
	var s=today.getSeconds();
	var d=today.getDate();
	var M=today.getMonth()+1;
	var y=today.getFullYear();
	var ampm;
	// add a zero in front of numbers<10
	h=checkTime(h);
	m=checkTime(m);
	s=checkTime(s);
	d=checkTime(d);
	M=checkTime(M);
	if(h<12) { ampm = "am" }
	else {ampm = "pm" }
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

var mainLayout = ['alm', 'tim', 'stw', '', '', '', ''];
var mainCommands = ['printControls("alarm")', 'printControls("timer")', 'printControls("stopwatch")', '', '', ''];

var alarmLayout = ['/|\\', '/|\\', 'set', '\\|/', '\\|/', 'bck', 'alm'];
var alarmCommands = ['alert("plusH")', 'alert("plusM")', 'alert("setAlarm")', 'alert("minusH")', 'alert("minusM")', 'printControls("main")', ''];

var timerLayout = ['/|\\', '/|\\', 'set', '\\|/', '\\|/', 'bck', 'tim'];
var timerCommands = ['alert("plusH")', 'alert("plusM")', 'alert("setTimer")', 'alert("minusH")', 'alert("minusM")', 'printControls("main")', ''];

var stopwatchLayout = ['', '', '', 'go!', 'rst', 'bck', 'stw'];
var stopwatchCommands = ['', '', '', 'alert("start")', 'alert("reset")', 'printControls("main")', ''];

function printControls(l) {
	var layout = window[l+"Layout"];
	var commands = window[l+"Commands"];
	
	for(var i=0;i<7;i++) {
		document.getElementById(controlsId[i]).innerHTML=layout[i];
		document.getElementById(controlsId[i]).setAttribute("onclick", commands[i]);
	}
}