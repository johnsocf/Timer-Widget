$(document).ready(function(){
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		axis_margin = 40,
		axis_origin = {x: axis_margin, y: canvas.height - axis_margin},
		axis_top = axis_margin,
		axis_right = canvas.width - axis_margin,
		horizontal_tick_spacing = 10,
		vertical_tick_spacing = 10,
		axis_width = axis_right - axis_origin.x,
		axis_height = axis_origin.y - axis_top,
		num_vertical_ticks = axis_height/ vertical_tick_spacing,
		num_horizontal_ticks = axis_width/ horizontal_tick_spacing,
		tick_width = 10,
		ticks_linewidth = 0.5,
		ticks_color = 'navy',
		axis_linewidth = 1.0,
		axis_color = 'blue';

		function drawGrid (color, stepx, stepy){
			for (var i = stepx + 0.5; i < context.canvas.width; i +=stepx) {
				context.beginPath();
				context.moveTo(i, 0);
				context.lineTo(i, context.canvas.height);
				context.stroke();
			}

			for (var i = stepy + 0.5; i <context.canvas.height; i +=stepy) {
				context.beginPath();
				context.moveTo(0, i);
				context.lineTo(context.canvas.width, i);
				context.stroke();
			}
		}

		function drawAxes() {
			context.save();
			context.strokeStyle = axis_color;
			context.lineWidth = axis_linewidth;

			drawHorizontalAxis();
			// drawVerticalAxis();

			context.lineWidth = 0.5;
			context.lineWidth = ticks_linewidth;
			context.strokeStyle = ticks_color;

			// drawVerticalAxisTicks();
			drawHorizontalAxisTicks();

			context.restore();
		}

		function drawHorizontalAxis() {
			context.beginPath();
			context.moveTo(axis_origin.x, axis_origin.y);
			context.lineTo(axis_right, axis_origin.y);
			context.stroke();
		}

		// function drawVerticalAxis() {
		// 	context.beginPath();
		// 	context.moveTo(axis_origin.x, axis_origin.y);
		// 	context.lineTo(axis_origin.x, axis_top);
		// 	context.stroke();
		// }

		// function drawVerticalAxisTicks() {
		// 	var deltaY;

		// 	for (var i = 1; i < num_vertical_ticks; ++i) {
		// 		context.beginPath();
		// 		if (i % 5 === 0) deltaX = tick_width;
		// 		else 			 deltaX = tick_width/2;

		// 		context.moveTo(axis_origin.x - deltaX,
		// 						axis_origin.y - i * vertical_tick_spacing);
		// 		context.lineTo(axis_origin.x + deltaX,
		// 						axis_origin.y - i * vertical_tick_spacing);
		// 		context.stroke();
		// 	}
		// }

		function drawHorizontalAxisTicks() {
			var deltaY;

			for (var i = 1; i < num_horizontal_ticks; ++i) {
				
				context.beginPath;
				var yOrigin = axis_origin.y,
					tickOrigin = axis_origin.y - 10,
					ytickOrigin = axis_origin.y - 5,
					xOrigin = axis_origin.x - 4;


				if (i % 5 === 0) deltaY = tick_width, yOrigin = tickOrigin;
				else 			 deltaY = tick_width/2, yOrigin = ytickOrigin;

				

				context.moveTo(xOrigin + i * horizontal_tick_spacing, 
								yOrigin - deltaY);
				context.lineTo(xOrigin + i * horizontal_tick_spacing, 
								yOrigin + deltaY);
				context.stroke();
			}
		}

		// drawGrid("lightgray", 10, 10);
		drawAxes();

});












