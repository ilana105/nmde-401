(function () {
    "use strict";

    var audioCtx, audioElement;
    var currVoice;
    var analyserNode;
    var compressor;
    var canvas, source, stream;
    var playBtn, recordBtn;
    var currRecording;
    var audioChunks = [];

    function init() {
        audioCtx = new ( window.AudioContext || window.webkitAudioContext );
        audioElement = document.querySelector('audio')
        analyserNode = audioCtx.createAnalyser();

        canvas = document.querySelector('canvas');
        audioCtx = canvas.getContext('2d');

        playBtn = document.querySelector('#playBtn');
        recordBtn = document.querySelector('#recordBtn');

        setUpEvents();
    }

    function setUpEvents() {
        recordBtn.addEventListener('click', function() {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        }, false);

        playBtn.addEventListener('click', function () {
            // check if context is in suspended state (autoplay policy)
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
    
            // play or pause track depending on state
            if (this.dataset.playing === 'false') {
                audioElement.play();
                this.dataset.playing = 'true';
            } else if (this.dataset.playing === 'true') {
                audioElement.pause();
                this.dataset.playing = 'false';
            }
    
        }, false);
    
        audioElement.addEventListener('ended', () => {
            playBtn.dataset.playing = 'false';
        }, false);
    }

    window.addEventListener("load", init);
}());

//record
//playback
//pause/play
