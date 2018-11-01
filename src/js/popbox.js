
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
/////////////////////////
document.addEventListener('DOMContentLoaded', () => {
	const source = 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';
	const video = document.querySelector('video');

	// For more options see: https://github.com/sampotts/plyr/#options
	// captions.update is required for captions to work with hls.js
	const player = new Plyr(video, {captions: {active: true, update: true, language: 'en'}});

	if (!Hls.isSupported()) {
		video.src = source;
	} else {
		// For more Hls.js options, see https://github.com/dailymotion/hls.js
		const hls = new Hls();
		hls.loadSource(source);
		hls.attachMedia(video);
		window.hls = hls;

		// Handle changing captions
		player.on('languagechange', () => {
			// Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
			setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
		});
	}

	// Expose player so it can be used from the console
	window.player = player;
});
(function () {

     // four image gallery
     var imageLinks = document.querySelectorAll('#image_container a')
     for (var i = 0; i < imageLinks.length; i++) {
       imageLinks[i].addEventListener('click', function (e) {
         e.preventDefault()
         BigPicture({
           el: e.target,
           gallery: '#image_container'
         });
       })
     }

     // unsplash gallery
     var unsplashImages = ['meiying', 'clemono2', 'heftiba', 'westbeach013', 'anniespratt', 'camylla93', 'nathananderson', 'aaronburden', 'elke_karin', 'scottwebb', 'lucabravo', 'neonbrand'].map(function (user) {
       return {
         src: 'https://source.unsplash.com/user/' + user + '/daily'
       }
     })
     document.getElementById('unsplash_gallery').onclick = function () {
       BigPicture({
         el: this,
         gallery: unsplashImages
       })
     }

     // other stuff
     function setClickHandler(id, fn) {
       document.getElementById(id).onclick = fn;
     }

     setClickHandler('local_image_container', function (e) {
       (e.target.tagName === 'IMG' || e.target.className === 'background-image') &&
         BigPicture({
           el: e.target
         });
     });

     setClickHandler('video_container', function (e) {
       var className = e.target.className;
       ~className.indexOf('htmlvid') &&
         BigPicture({
           el: e.target,
           vidSrc: e.target.getAttribute('vidSrc')
         });
       ~className.indexOf('vimeo') &&
         BigPicture({
           el: e.target,
           vimeoSrc: e.target.getAttribute('vimeoSrc')
         });
       ~className.indexOf('youtube') &&
         BigPicture({
           el: e.target,
           ytSrc: e.target.getAttribute('ytSrc')
         });
     })

     setClickHandler('broken_container', function (e) {
       e.target.id === 'broken_image' &&
         BigPicture({
           el: e.target,
           imgSrc: '/nopic.jpg'
         });
       e.target.id === 'broken_vid' &&
         BigPicture({
           el: e.target,
           vidSrc: '/novid.mp4'
         });
       ~e.target.className.indexOf('vimeo') &&
         BigPicture({
           el: e.target,
           vimeoSrc: 'ajoiejlkr'
         })
       ~e.target.className.indexOf('youtube') &&
         BigPicture({
           el: e.target,
           ytSrc: 'oijlksdjf'
         })
     });

     setClickHandler('audio_example', function(e) {
       e.preventDefault()
       BigPicture({
         el: this,
         audio: '/audio/happy-step.mp3'
       })
     })
   })();
