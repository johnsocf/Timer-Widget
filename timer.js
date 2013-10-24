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
})();