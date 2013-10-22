(function () {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		image = new Image(),
		$scaleOutput = $('#scaleOutput'),
		$scaleSlider = $('#scaleSlider'),
		$upButton = $('#upButton'),
		$downButton = $('#downButton'),
		$powerButton = $('#powerButton'),
		//$toggleSlider = $('#toggleSlider'),
		scale = scaleSlider.value,
		//unit = toggleSlider.value,
		scale = 0,
		MINIMUM_SCALE = 0,
		text,
		MAXIMUM_SCALE = 1000,
		val = 'no',
		minutes = 60,
		hour = (text/minutes).toFixed(2);

	function defineTimeUnit (unit) {
		console.log(unit)
	}


	function drawText(value) { 
		var time = text,
			hour = (text/minutes).toFixed(2);
		val = $('#flip-3').val();
	    if(val=== "yes"){
	    	time = hour;
	    	scaleOutput.innerText = (time + " hours");
	    }
	    else {
	    	scaleOutput.innerText = (time + " minutes");
	    }
	    console.log(val);
	   // scaleOutput.innerText = text;
	}	

	$(scaleSlider).change(function(e){
		text = e.target.value;
	    slideAdjust(text);
	});

	$('#flip-3').change(function() {
	self = $(this);
	var val = 'no',
		time = text,
		minutes = 60,
		hour = (text/minutes).toFixed(2);

	console.log("here");
    if(val!==$(this).val()){
    	console.log($(this).val());
    }
    val = $(this).val();

    if(val=== "yes"){
    	console.log("sometimes yes");
    	time = hour;
    	console.log(time + " hours");
    	scaleOutput.innerText = (time + " hours");
    }
    else {
    	console.log("this time no"); 
    	console.log(time + " minutes");
    	scaleOutput.innerText = (time + " minutes");
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

	});

	$(upButton).click(function(e){
	   text ++;
	   console.log(text);
	   drawText(text);

	   scale = e.target.value;

	   if (scale < MINIMUM_SCALE) scale = MINIMUM_SCALE;
	   else if (scale > MAXIMUM_SCALE) scale = MAXIMUM_SCALE;

	   slideAdjust(text);
	});

	$(downButton).click(function(e){
		if(text > 0) {
			text --;
			drawText(text);
		}
	})
	
	image.src = '';
	image.onload = function(e) {
		drawText(scaleSlider.value);
	}
})();