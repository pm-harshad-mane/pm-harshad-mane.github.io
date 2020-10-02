
function ajax(url, callback){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       // Typical action to be performed when the document is ready:
	       if(typeof callback === "function"){
	       	callback(xhttp.responseText)
	       }
	    }
	};	
	xhttp.open("GET", url, true);
	xhttp.withCredentials = "true";
	// xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	// xhttp.setRequestHeader('Content-Type', 'text/plain');
	xhttp.send();
}
