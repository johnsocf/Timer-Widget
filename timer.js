(function () {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		image = new Image(),
		scaleOutput = document.getElementById('scaleOutput'),
		scaleSlider = document.getElementById('scaleSlider'),
		scale = scaleSlider.value,
		scale = 0,
		MINIMUM_SCALE = 0,
		MAXIMUM_SCALE = 1000;

	function drawScaleText(value) { 
	   var text = parseFloat(value);
	   var percent = parseFloat(value - MINIMUM_SCALE) /
	                 parseFloat(MAXIMUM_SCALE - MINIMUM_SCALE);

	   scaleOutput.innerText = text;
	   //percent = percent < 0.35 ? 0.35 : percent;
	   //scaleOutput.style.fontSize = percent*MAXIMUM_SCALE/1.5 + 'em';
	}	

	scaleSlider.onchange = function(e) {
	   scale = e.target.value;

	   if (scale < MINIMUM_SCALE) scale = MINIMUM_SCALE;
	   else if (scale > MAXIMUM_SCALE) scale = MAXIMUM_SCALE;

	   //drawScaled();
	   drawScaleText(scale);
	}

	var scale = 0;
	image.src = '';
	image.onload = function(e) {
		drawScaleText(scaleSlider.value);
	}
})();