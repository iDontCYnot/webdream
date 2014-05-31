MAX_HR = 23.0, MAX_DAY = 6.0; // Constants for days and hours
MAX_COUNT = 0; // Max count value for all objs

/*
* Make object to store domain related info
*/
function Memory(domain, datetime){
	this.domain = domain;
	var date = new Date(datetime);
    this.day = date.getDay();
    this.hour = date.getHours();
    this.count = 1.0;
}

/*
* Gets relative scale of object
*/
Memory.prototype.getSize = function(){
    return this.count / MAX_COUNT;
};

/*
* Gets absolute size of object
*/
Memory.prototype.getRealSize = function(min, max){
	var rel = this.getSize();
	rel *= (max - min);
    return rel + min;
};

/*
* Gets relative position of object
*/
Memory.prototype.getPosition = function(){
	var avgDay = this.day / this.count;
	var avgHr = this.hour / this.count;
	//avgDay /= MAX_DAY;
	//avgHr /= MAX_HR;
    return {x: avgDay, y: avgHr};
};

/*
* Gets absolute position of object
*/
Memory.prototype.getRealPosition = function(oneday, onehour){
	var pos = this.getPosition();
	// ensure padding is respected
	pos.x = (pos.x * oneday) + (oneday/2.0);
	pos.y = (pos.y * onehour) + (onehour/2.0);
    return pos;
};

/*
* Increment count and update position
*/
Memory.prototype.incrementCount = function(datetime){
	var date = new Date(datetime);
    this.day += date.getDay();
    this.hour += date.getHours();
    this.count++;
    MAX_COUNT = Math.max(MAX_COUNT, this.count);
};

/*
* print it all nice and stuff
*/
Memory.prototype.toString = function(datetime){
    return this.domain + " [" + this.count + "] (" + this.getPosition().x + ", " + this.getPosition().y + ')';
};
