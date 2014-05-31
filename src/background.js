MAX_EVENTS = 2147483647; // most history items we can nom

function doVisits(domain, url, draw){
	chrome.history.getVisits({url: url}, function(visits){
			for(var v in visits){
				// add to key-value store
				if(typeof kvstore[domain] !== "undefined"){
					// it exists - lets go
					kvstore[domain].incrementCount(visits[v].visitTime);
				} else {
					// make new memory
					kvstore[domain] = new Memory(domain, visits[v].visitTime);
				}
			}
			if(draw){
				// draw the results if we're told to
				drawResults(kvstore);
			}
	});
}

function processHistory(results){
	kvstore = []; //global key-value store for domain(string)-memory(object)
	// move through results
	for(var i in results){
		var expr = /\/\/[^\/]+\//;
		var domains = results[i].url.match(expr);
		var domain = domains[0].replace(/\//g,"");
		var draw = i == results.length - 1;
		doVisits(domain, results[i].url, draw);
	}
}


// function to get stuff going
function letsgo(){
	// dates
	var today = new Date();
	var prior = new Date(today);
	prior.setDate(today.getDate() - 7);
	// from epoch
	var stime = prior.getTime();
	var etime = today.getTime();
	// query history
	var query = {text: "", startTime: stime, endTime: etime, maxResults: MAX_EVENTS};

	chrome.history.search(query, processHistory);
}

window.onload = letsgo;
