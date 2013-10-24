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
		$switchButton = $('#switch'),
		$powerOn = $('#on-button'),
		$powerOff = $('#power-off-display'),
		scale = scaleSlider.value,
		scale = 0,
		MINIMUM_SCALE = 0,
		text = 0,
		MAXIMUM_SCALE = 3000,
		minutes = 60,
		currentTime,
		refreshInterval,
		font_height = 15,
		margin = 35,
		loop,
		hand_truncation = canvas.width/25,
		hour_hand_truncation = canvas.width/10,
		numeral_spacing = 20,
		radius = canvas.width/2 - margin,
		hand_radius = radius + numeral_spacing,
		hour = (text/minutes).toFixed(2);



	document.onload = function(e) {
		drawText(text);
		powerOn();
	}
	
	$scaleSlider.change(function(e){
		text = e.target.value;
	    slideAdjust(text);
	    bufferSlider(text);
	});

	$upButton.mousedown(function(e){
		refreshInterval = setInterval(increaseCount,30)
	}).mouseup(function(e){
		clearInterval(refreshInterval);
		refreshInterval = 0;
	});

	$downButton.mousedown(function(e){
		refreshInterval = setInterval(decreaseCount,30)
	}).mouseup(function(e){
		clearInterval(refreshInterval);
		refreshInterval = 0;
	});

	$powerButton.click(function (){
		$scaleOutput.toggle(function(){});
		$powerOff.toggle();
		$timeUnits.toggle();
		$powerOn.toggleClass("blue-button");
		$powerOn.toggleClass("white-button");
		$scaleSlider.css(
	      'background',
      'linear-gradient(to right, #000 0%, #000 ' + 0/28 + '%, #000 ' + 0/28 + '%, #000 ' + 0 + '%, #000 ' + 0 + '%, #000 100%)'
    );
		text = 0;
		drawText(text);
		currentTime = 0;
		moveSlider(currentTime);
	});

	$switchButton.change(function(){
		self = $(this);
		time = text,
		minutes = 60,
		hour = (text/minutes).toFixed(2);


		if($switchButton.prop('checked')) {
		    time = hour;
	    	$scaleOutput.text(time);
	    	$timeUnits.text("hrs");
	    	if (time>20) {
	    		$scaleOutput.css("left","29%");
	    	}
	    	else {
	    		$scaleOutput.css("left","35%");
	    	}
		} else {
    		$scaleOutput.text(time);
    		$timeUnits.text("min");
    		if (time < 2000) {
	    		$scaleOutput.css("left","38%");
	    	}
	    	else {
	    		$scaleOutput.css("left","33%");
	    	}
		}
	});

	function slideAdjust(text) {
		if (text < MINIMUM_SCALE) text = MINIMUM_SCALE;
	    else if (text > MAXIMUM_SCALE) text = MAXIMUM_SCALE;
	    drawText(text);
	}

	function powerOn () {
		text = 0;
		drawText(text);
		currentTime = 0;
		moveSlider(currentTime);
	}

	function drawText(value) { 
		var time = text,
			hour = (text/minutes).toFixed(2);
		
	    if($switchButton.prop('checked')) {
	    	time = hour;
	    	$scaleOutput.text(time);
	    	$timeUnits.text("hrs");
	    	currentTime = text;
	    	if (time>20) {
	    		$(scaleOutput).css("left","29%");
	    	}
	    	else {
	    		$(scaleOutput).css("left","35%");
	    	}
	    }
	    else {
	    	$scaleOutput.text(time);
	    	$timeUnits.text("min");
	    	currentTime = text;
	    	if (time < 2000) {
	    		$scaleOutput.css("left","38%");
	    	}
	    	else {
	    		$scaleOutput.css("left","33%");
	    	}
	    }
	}	

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
		$scaleSlider.val(currentTime);
	    bufferSlider(text);
	}

	function bufferSlider(text) {
		var val = $scaleSlider.val(),
	    	buf = ((100 - val)/ 15) + parseInt(val);
		if(text < 200) {
	    	$scaleSlider.css(
			      'background',
			      'linear-gradient(to right, #9AD3DF 0%, #9AD3DF ' + val/15 + '%, #000 ' + val/15 + '%, #000 ' + buf + 10 + '%, #000 ' + buf + '%, #000 100%)'
			    ); 
	    	console.log("here");}
	    else if(200 < text && text < 470) {
	    	$scaleSlider.css(
			      'background',
			      'linear-gradient(to right, #9AD3DF 0%, #9AD3DF ' + val/20 + '%, #000 ' + val/20 + '%, #000 ' + buf +10 + '%, #000 ' + buf + '%, #000 100%)'
			    ); 
	    }	
		else {$scaleSlider.css(
			      'background',
			      'linear-gradient(to right, #9AD3DF 0%, #9AD3DF ' + val/29 + '%, #000 ' + val/29 + '%, #000 ' + buf + '%, #000 ' + buf + '%, #000 100%)'
			    );
			console.log("here3");}
	}

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





// ruler in canvas

// var ruler = document.getElementById("ruler"),
// 	rulerContext = ruler.getContext("2d"),
// 	axis_margin = 0,
// 	axis_origin = {x: axis_margin, y: ruler.height - axis_margin},
// 	axis_right = ruler.width,
// 	horizontal_tick_spacing = 3,
// 	axis_width = axis_right - axis_origin.x +100,
// 	num_horizontal_ticks = axis_width/ horizontal_tick_spacing,
// 	tick_width = 5,
// 	ticks_linewidth = 0.09,
// 	ticks_color = '#9A9A9A';

// 	function drawAxes() {
// 		rulerContext.save();
// 		rulerContext.lineWidth = 0.5;
// 		rulerContext.lineWidth = ticks_linewidth;
// 		rulerContext.strokeStyle = ticks_color;
// 		drawHorizontalAxisTicks();
// 		rulerContext.restore();
// 	}

// 	function drawHorizontalAxisTicks() {
// 		var deltaY;

// 		for (var i = 1; i < num_horizontal_ticks; ++i) {
			
// 			rulerContext.beginPath;
// 			var yOrigin = axis_origin.y,
// 				tickOrigin = axis_origin.y - 13,
// 				ytickOrigin = axis_origin.y - 15,
// 				xOrigin = axis_origin.x - 4;

// 			if (i % 5 === 0) deltaY = tick_width, yOrigin = tickOrigin;
// 			else 			 deltaY = tick_width/2, yOrigin = ytickOrigin;

// 			rulerContext.moveTo(xOrigin + i * horizontal_tick_spacing, 
// 							yOrigin - deltaY);
// 			rulerContext.lineTo(xOrigin + i * horizontal_tick_spacing, 
// 							yOrigin + deltaY);
// 			rulerContext.stroke();
// 		}
// 	}
// 	drawAxes();

})();