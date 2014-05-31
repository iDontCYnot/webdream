MIN_SIZE = 2; // minumum radius
MAX_SIZE = 240; // maximum radius

function drawResults(memories){
	var c = document.getElementById("dreamCanvas");
	var oneday = c.width / 7.0;
	var onehour = c.height / 24.0;
	//get context
	var ctx = c.getContext("2d");
	// do largest first
	memories.sort(function(a,b){return a.count-b.count});
	// draw each memory
	for(var m in memories){
		// make totally random colour
		var r,g,b;
		r = Math.round(Math.random() * 255);
		g = Math.round(Math.random() * 255);
		b = Math.round(Math.random() * 255);
		// get values
		var memory = memories[m];
		var pos = memory.getRealPosition(oneday, onehour);
		var rad = memory.getRealSize(MIN_SIZE,MAX_SIZE);
		// draw it
		ctx.beginPath();
		ctx.fillStyle = "rgba("+r+","+g+","+b+", 0.5 )";
		ctx.arc(pos.x,pos.y,rad,0,2*Math.PI);
		ctx.fill();
	}
	// draw each host title
	memories.reverse();
	for(var m in memories){
		var memory = memories[m];
		// text
		var text_alpha = memory.getSize();
		ctx.beginPath();
		ctx.fillStyle = "rgba(0,0,0,"+ text_alpha +")";
		var pos = memory.getRealPosition(oneday, onehour);
		ctx.fillText(memory.domain,pos.x,pos.y);
	}
}
