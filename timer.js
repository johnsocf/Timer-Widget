(function () {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		image = new Image(),
		$scaleOutput = $('#scaleOutput'),
		$scaleSlider = $('#scaleSlider'),
		$upButton = $('#upButton'),
		$downButton = $('#downButton'),
		$powerButton = $('#powerButton'),
		$toggleSlider = $('#toggleSlider'),
		scale = scaleSlider.value,
		unit = toggleSlider.value,
		scale = 0,
		MINIMUM_SCALE = 0,
		text = 0,
		MAXIMUM_SCALE = 1000;

	$(toggleSlider).change(function(e){
		unit = e.target.value;
		//drawText(text);
		toggleSlider.value = 1 ? console.log("one") : console.log("two");
	    
	});	

	function defineTimeUnit (unit) {
		//if (unit < 1) {console.log("unit is 1 " + unit);}
		console.log(unit)
		
	}


	function drawText(value) { 

	   text = parseFloat(value);
	   hours = Math.ceil(text/60);
	   minutes = text;
	   defineTimeUnit(unit);

	   scaleOutput.innerText = text;
	   //else {console.log("unit in drawText is zero");}
	   //scaleOutput.innerText = text + " hours";

	   //else {scaleOutput.innerText = text/60 + "hours"; }
	}	

	$(scaleSlider).change(function(e){
		text = e.target.value;
	    slideAdjust(text);
	});


	

	// scaleSlider.onchange = function(e) {
	//    text = e.target.value;
	//    slideAdjust(text);

	   
	// };

	function slideAdjust(text, unit) {
		if (text < MINIMUM_SCALE) text = MINIMUM_SCALE;
	   else if (text > MAXIMUM_SCALE) text = MAXIMUM_SCALE;

	   //drawScaled();
	   drawText(text);


	}

	$(powerButton).click(function (){
		$('#scaleOutput').toggle();
		text = 0;
		drawText(text);

	});

	$(upButton).click(function(e){

	   //console.log("text 1 " + text);	
	   //console.log('here');
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