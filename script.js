$(document).ready(prepTimer);

var clock;

function prepTimer() {
	var indicator = false; //Follows if countdown is triggered
	var defaultTime = 25; 
	var breakTime = 5; 
	var customHour = 0;
	var customMin = 0;
	var customSec = 0;
	var defaultMin = parseInt(defaultTime); 
	var defaultSec = "0" + 0;
	
	$("#clock").html(defaultMin + ":" + defaultSec);
	var timeLeft; var seconds = 0; var minutes = 0;

	// onStart
	$("#start").on('click', function() {
		if(indicator) {
			timeLeft = $("#clock")["0"].innerHTML;
			seconds = parseInt(timeLeft.slice(timeLeft.length-2,timeLeft.length));
			minutes = parseInt(timeLeft.slice(0,timeLeft.length-3));
			clearInterval(clock);
			$("#clock").html(minutes + ":" + seconds);
			$("#start p").html('start');
			indicator = false;
			return;
		}
		if (!indicator) {
			if(minutes != 0 && seconds != 0) {
				var time = minutes + seconds / 60;
				startTimer(time);
				$("#start p").html('pause');
				indicator = true;
				return;
			} 
			if(minutes == 0 && seconds == 0) {
				startTimer(defaultTime);
				$("#start p").html('pause');
				indicator = true;
				return;
			}
		}
	});

	// onReset
	$("#reset").on('click', function() {
		$("#start p").html('start');
		clearInterval(clock);
		$("#clock").html(defaultMin + ":" + defaultSec);
		minutes = 0;
		seconds = 0;
		$('input')["0"].value = " ";	
		$('input')[1].value = " "; 
		$('input')[2].value = " ";
		indicator = false;	
	});

	// onBreak
	$("#break").on('click', function() {
		if(indicator) {
			$("#break p").html('start break');
			clearInterval(clock);
			$("#clock").html(breakTime + ":" + defaultSec);
			indicator = false;
			return;
		}
		if (!indicator) {
			$("#break p").html('stop break');
			startTimer(breakTime);
			indicator = true;
			return;
		}
	});

	// onCustom
	$("#custom").on('click', function() {
		customHour = $('input')["0"].value;	customMin = $('input')[1].value; customSec = $('input')[2].value;
		if(customSec === "") { customSec = 0;}
		if(customMin === "") { customMin = 0;}
		if(customHour === "") { customHour = 0;}
		var customTime = parseInt(customHour, 10) * 60 + parseInt(customMin, 10) + parseInt(customSec, 10) / 60;

		$("#start p").html('pause');
				indicator = true;
				
		startTimer(customTime);
	});
}

function startTimer(time) {
    var timer = time * 60; var minutes = parseInt(timer / 60); var seconds = parseInt(timer % 60);
    seconds = seconds < 10 ? "0" + seconds : seconds;

    $("#clock").html(minutes + ":" + seconds);
    clock = setInterval(function () { 
    	if(minutes == 0 && seconds == 0) {
			clearInterval(clock);
    		return;
    	} 
    	if(seconds == 0) {
        	seconds = 60;
        	minutes = minutes - 1;
        }
        minutes = minutes < 10 ? minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;


        seconds = seconds - 1;
        if(seconds == 0) {
        	seconds = "00";
        }

        $("#clock").html(minutes + ":" + seconds);

    }, 1000);
}
