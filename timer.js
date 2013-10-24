(function () {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		image = new Image(),
		$scaleOutput = $('#scaleOutput'),
		$scaleSlider = $('#scaleSlider'),
		$upButton = $('#upButton'),
		$downButton = $('#downButton'),
		$powerButton = $('#powerButton'),
		$timeUnits = $('#timeUnits'),
		scale = scaleSlider.value,
		scale = 0,
		MINIMUM_SCALE = 0,
		text = 0,
		MAXIMUM_SCALE = 3000,
		minutes = 60,
		currentTime,
		refreshInterval,
		hour = (text/minutes).toFixed(2);

	

	function drawText(value) { 
		var time = text,
			hour = (text/minutes).toFixed(2);
		
	    if($('#switch').prop('checked')) {
	    	time = hour;
	    	scaleOutput.innerText = (time);
	    	timeUnits.innerText = ("hrs");
	    	currentTime = text;
	    	if (time>20) {
	    		$(scaleOutput).css("left","29%");
	    		console.log(time);
	    	}
	    	else {
	    		$(scaleOutput).css("left","35%");
	    		console.log(time);
	    	}
	    }
	    else {
	    	scaleOutput.innerText = (time);
	    	timeUnits.innerText = ("min");
	    	currentTime = text;
	    	if (time < 2000) {
	    		$(scaleOutput).css("left","38%");
	    	}
	    	else {
	    		$(scaleOutput).css("left","33%");
	    	}
	    }
	}	

	$(scaleSlider).change(function(e){
		text = e.target.value;
	    slideAdjust(text);
	});

	$('#switch').change(function(){
		self = $(this);
		time = text,
		minutes = 60,
		hour = (text/minutes).toFixed(2);


		if($('#switch').prop('checked')) {
		    time = hour;
	    	scaleOutput.innerText = (time);
	    	timeUnits.innerText = ("hrs");
	    	if (time>20) {
	    		$(scaleOutput).css("left","29%");
	    		console.log(time);
	    	}
	    	else {
	    		$(scaleOutput).css("left","35%");
	    		console.log(time);
	    	}
		} else {
    		scaleOutput.innerText = (time);
    		timeUnits.innerText = ("min");
    		if (time < 2000) {
	    		$(scaleOutput).css("left","38%");
	    	}
	    	else {
	    		$(scaleOutput).css("left","33%");
	    	}
		}


	});

	
		
	function slideAdjust(text) {
		if (text < MINIMUM_SCALE) text = MINIMUM_SCALE;
	   else if (text > MAXIMUM_SCALE) text = MAXIMUM_SCALE;
	   drawText(text);
	}

	$(powerButton).click(function (){
		$('#scaleOutput').toggle(function(){});
		$('#power-off-display').toggle();
		$('#timeUnits').toggle();
		$('#on-button').toggleClass("blue-button");
		$('#on-button').toggleClass("white-button");
		text = 0;
		drawText(text);
		currentTime = 0;
		moveSlider(currentTime);

	});

	function powerOn () {
		text = 0;
		drawText(text);
		currentTime = 0;
		moveSlider(currentTime);
	}

	$(upButton).mousedown(function(e){
		refreshInterval = setInterval(increaseCount,30)
	}).mouseup(function(e){
		clearInterval(refreshInterval);
		refreshInterval = 0;
	});

	$(downButton).mousedown(function(e){
		refreshInterval = setInterval(decreaseCount,30)
	}).mouseup(function(e){
		clearInterval(refreshInterval);
		refreshInterval = 0;
	});

	function increaseCount () {
		text ++;
		drawText(text);
		moveSlider(currentTime);
		if (scale < MINIMUM_SCALE) scale = MINIMUM_SCALE;
	    else if (scale > MAXIMUM_SCALE) scale = MAXIMUM_SCALE;
	}

	function decreaseCount () {
		if(text > 0) {
			text --;
			drawText(text);
			moveSlider(currentTime);
		}
	}

	function moveSlider(text) {
		$('#scaleSlider').val(currentTime);
	}
	
	
	image.src = '';
	image.onload = function(e) {
		drawText(text);
		powerOn();
	}



	var font_height = 15,
	margin = 35,
	loop,
	hand_truncation = canvas.width/25,
	hour_hand_truncation = canvas.width/10,
	numeral_spacing = 20,
	radius = canvas.width/2 - margin,
	hand_radius = radius + numeral_spacing;

function drawCircle() {
	context.beginPath();
	context.arc(canvas.width/2, canvas.height/2, radius, 0, Math.PI*2, true);
	context.lineWidth = "5";
	context.stroke();
}	





function drawCenter() {
	context.beginPath();
	context.arc(canvas.Width/2, canvas.height/2, 5, 0, Math.PI*2, true);
	context.fill();
}

function drawHand(loc, isHour) {
	var angle = (Math.PI*2) * (loc/60) - Math.PI/2,
		handRadius = isHour ? radius - hand_truncation - hour_hand_truncation : radius - hand_truncation;
		context.moveTo(canvas.width/2, canvas.height/2);
		context.lineTo(canvas.width/2 + Math.cos(angle)*handRadius,
						canvas.height/2 + Math.sin(angle)*handRadius);
		context.strokeStyle = "#fff";
		context.lineWidth = "2";
		context.stroke();
}

function drawHands() {
	var numberSeconds = text,
	numberHours = text / 60,
	extraMinutes = text % 60;
	console.log("drawing hands");

	hour = hour > 12 ? hour - 12 : hour;
	drawHand(numberHours, true, 0.5);
	drawHand(extraMinutes, false, 0.5);
	drawHand(numberSeconds, false, 0.2);
	drawHand((numberSeconds/60), false, 0.2);
}

function drawClock() {
	context.clearRect(0,0,canvas.width, canvas.height);
	drawCircle();
	drawCenter();
	drawHands();
}

context.font = font_height + 'px Arial';
loop = setInterval(drawClock, 1000);












})();