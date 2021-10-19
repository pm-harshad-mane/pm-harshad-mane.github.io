(function(){

	let stream = null;
	let ready = false;
	let photo = null;
	let theGeneratedText = '';
	var myCarousel = document.querySelector('#carouselExampleSlidesOnly');
	var carousel = new bootstrap.Carousel(myCarousel);
	let video = document.querySelector("video");
	var actionActivateCamera = document.querySelector('#action-activate-camera');
	var actionTakePicture = document.querySelector('#action-take-picture');
	var actionConvertToText = document.querySelector("#action-convert-to-text");
	var actionStartReading = document.querySelector('#action-start-reading');
	
	// Main caraousel UI	
	carousel.interval = false;
	carousel.touch = false;
	carousel.pause();

	// activate camera
	actionActivateCamera.onclick = async function(){
		stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: {
			  facingMode: 'environment'
			}
		});      
      	video.srcObject = stream;      
		video.onloadedmetadata = (e) => {
			ready = true
		}      
		video.onended = (e) => {
			ready = false
			stream = null
		}
		carousel.to(1);
	};

	actionTakePicture.onclick = function(){
		// let video = video;
		let videoCanvas = document.createElement('canvas');
		videoCanvas.height = video.videoHeight;
		videoCanvas.width = video.videoWidth;

		let videoContext = videoCanvas.getContext('2d')
		videoContext.drawImage(video, 0, 0)

		photo = loadImage.scale(videoCanvas, {
			maxHeight: videoCanvas.height,
			maxWidth: videoCanvas.width,
			cover: true,
			crop: true,
			canvas: true
		});

		stream.getTracks().forEach(function(track) {
	        if (track.readyState == 'live' && track.kind === 'video') {
	            track.stop();
	        }
	    });

		document.querySelector("#photo").src = photo.toDataURL('image/jpeg');
		carousel.to(2);
	}

	function progressUpdate(packet){
    	console.log(packet);
    	if(packet.status == 'done'){
    		theGeneratedText = packet.data.data.text;
			theGeneratedText = theGeneratedText.replaceAll('\n', ' ');
			// var pre = document.createElement('pre');
			// pre.appendChild(document.createTextNode(text));
			document.querySelector("#log").appendChild(document.createTextNode(theGeneratedText));
			carousel.to(3);
		}
    }

    actionConvertToText.onclick = async function(){
    	console.log('recognizing the file');
    	document.querySelector("#spinner").classList.remove("visually-hidden");
    	actionConvertToText.classList.add("visually-hidden");
		document.querySelector("#log").innerHTML = '';
		const corePath = 'tesseract-core.wasm.js';
		const lang = 'eng';
		const data = await Tesseract.recognize(
			photo.toDataURL('image/jpeg'),
			lang, 
			{
				corePath,
				logger: progressUpdate,
			}
		);
		progressUpdate({ status: 'done', data });
	}

	actionStartReading.onclick = function(){
		var utterance = new SpeechSynthesisUtterance();
		// utterance.text = document.querySelector("#log").innerHTML;
		utterance.text = theGeneratedText;
		utterance.onboundary = onboundaryHandler;
		window.speechSynthesis.speak(utterance);
	}


	// code to highlihght the text
	function onboundaryHandler(event){
	    // var textarea = document.getElementById('log');
	    var thePara = document.getElementById('log');
	    var value = theGeneratedText;
	    var index = event.charIndex;
	    var word = getWordAt(value, index);

	    thePara.innerHTML = theGeneratedText.substring(0, index) 
	    	+ "<strong>" 
	    	+ theGeneratedText.substring(index, index+word.length)
	    	+ "</strong>" 
	    	+ theGeneratedText.substring(index+word.length);


	    /*
			var index = innerHTML.indexOf(text);
			if (index >= 0) { 
				innerHTML = innerHTML.substring(0,index) 
				+ "<span class='highlight'>" 
				+ innerHTML.substring(index,index+text.length) + 
				"</span>" 
				+ innerHTML.substring(index + text.length);
				inputText.innerHTML = innerHTML;
			}
	    */


	    // old textarea related code
	    // var anchorPosition = getWordStart(value, index);
	    // var activePosition = anchorPosition + word.length;
	    
	    // textarea.focus();
	    
	    // if (textarea.setSelectionRange) {
	    //    textarea.setSelectionRange(anchorPosition, activePosition);
	    // }
	    // else {
	    //    var range = textarea.createTextRange();
	    //    range.collapse(true);
	    //    range.moveEnd('character', activePosition);
	    //    range.moveStart('character', anchorPosition);
	    //    range.select();
	    // }
	};

	// Get the word of a string given the string and index
	function getWordAt(str, pos) {
	    // Perform type conversions.
	    str = String(str);
	    pos = Number(pos) >>> 0;

	    // Search for the word's beginning and end.
	    var left = str.slice(0, pos + 1).search(/\S+$/),
	        right = str.slice(pos).search(/\s/);

	    // The last word in the string is a special case.
	    if (right < 0) {
	        return str.slice(left);
	    }
	    
	    // Return the word, using the located bounds to extract it from the string.
	    return str.slice(left, right + pos);
	}

	// Get the position of the beginning of the word
	function getWordStart(str, pos) {
	    str = String(str);
	    pos = Number(pos) >>> 0;

	    // Search for the word's beginning
	    var start = str.slice(0, pos + 1).search(/\S+$/);
	    return start;
	}

})();