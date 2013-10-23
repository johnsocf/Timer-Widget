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
		val = 'no',
		minutes = 60,
		currentTime,
		refreshInterval,
		hour = (text/minutes).toFixed(2);

	function defineTimeUnit (units) {
	}

	function drawText(value) { 
		var time = text,
			hour = (text/minutes).toFixed(2);
		val = $('#flip-3').val();
	    if($('#switch').prop('checked')) {
	    	time = hour;
	    	scaleOutput.innerText = (time);
	    	timeUnits.innerText = ("hrs");
	    	currentTime = text;
	    }
	    else {
	    	scaleOutput.innerText = (time);
	    	timeUnits.innerText = ("min");
	    	currentTime = text;
	    }
	    console.log(val);
	}	

	$(scaleSlider).change(function(e){
		text = e.target.value;
	    slideAdjust(text);
	});

	$('#switch').change(function(){
		self = $(this);
		var val = 'no',
		time = text,
		minutes = 60,
		hour = (text/minutes).toFixed(2);
		console.log("switch changed");


		if($('#switch').prop('checked')) {
		    console.log("checked");
		    time = hour;
	    	console.log(time + " hours");
	    	scaleOutput.innerText = (time);
	    	timeUnits.innerText = ("hrs");
		} else {
		    console.log(time + " minutes");
    		scaleOutput.innerText = (time);
    		timeUnits.innerText = ("min");
		}


	});

	
		
	function slideAdjust(text) {
		if (text < MINIMUM_SCALE) text = MINIMUM_SCALE;
	   else if (text > MAXIMUM_SCALE) text = MAXIMUM_SCALE;
	   drawText(text);
	}

	$(powerButton).click(function (){
		$('#scaleOutput').toggle();
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