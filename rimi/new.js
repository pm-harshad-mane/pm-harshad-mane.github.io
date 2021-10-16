(function(){

	let stream = null;
	let ready = false;
	let photo = null;
	var myCarousel = document.querySelector('#carouselExampleSlidesOnly');
	var carousel = new bootstrap.Carousel(myCarousel);
	let video = document.querySelector("video");
	var actionActivateCamera = document.querySelector('#action-activate-camera');
	var actionTakePicture = document.querySelector('#action-take-picture');
	var actionConvertToText = document.querySelector("#action-convert-to-text");
	var actionStartReading = document.querySelector('#action-start-reading');
	
	// Main caraousel UI	
	carousel.interval = false;
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

		document.querySelector("#photo").src = photo.toDataURL('image/jpeg');
		carousel.to(2);
	}

	function progressUpdate(packet){
    	console.log(packet);
    	if(packet.status == 'done'){
    		var text = packet.data.data.text;
			text = text.replaceAll('\n', ' ');
			var pre = document.createElement('pre');
			pre.appendChild(document.createTextNode(text));					
			document.querySelector("#log").appendChild(pre);
			carousel.to(3);
		}
    }

    actionConvertToText.onclick = async function(){
    	console.log('recognizing the file');
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
		var msg = new SpeechSynthesisUtterance();
		msg.text = document.querySelector("#log pre").innerHTML;
		window.speechSynthesis.speak(msg);
	}

})();