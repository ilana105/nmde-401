(function () {
    "use strict";

    var audioCtx, audioElement;
    var currVoice, voiceOptions;
    var analyserNode, sourceNode;
    var compressor;
    var canvas, waveformDisplay;
    var playBtn, recordBtn, deleteBtn;
    var currRecording;

    function init() {
        audioCtx = new (window.AudioContext || window.webkitAudioContext);
        audioElement = document.querySelector('audio')
        analyserNode = audioCtx.createAnalyser();

        sourceNode = audioCtx.createMediaElementSource(audioElement);
        sourceNode.connect(analyserNode);
        analyserNode.connect(audioCtx.destination);

        waveformDisplay = document.querySelector('.waveformContainer');
        canvas = document.querySelector('canvas');
        audioCtx = canvas.getContext('2d');

        playBtn = document.querySelector('#playBtn');
        recordBtn = document.querySelector('#recordBtn');
        voiceOptions = document.querySelector('.voiceOptions');
        deleteBtn = document.querySelector('#deleteBtn');

        setUpEvents();
    }

    function setUpEvents() {
        let count = 0;

        recordBtn.addEventListener('click', function () {
            if (currVoice) {
                count++;

                if (count % 2 === 1) {
                    console.log('started recording');
                    console.log(recordAudio());
                    recordBtn.style.backgroundImage = "url('assets/recording.svg')";
                    recordAudio().then(function(record) {
                        record.start();
                    });
                    recordAudio();
                }

                if (count % 2 === 0) {
                    console.log('stopped recording');
                    console.log(recordAudio());
                    recordAudio().then(function(record) {
                        record.stop();
                    });
                    recordBtn.style.backgroundImage = "url('assets/startrecord.svg')";
                    playBtn.style.display = "block";
                    deleteBtn.style.display = "block";
                }
            }
        });

        playBtn.addEventListener('click', function () {
            if (currVoice) {
                count++;
                var elem = document.createElement("img");
                elem.src = "assets/wavelength-nobackground.svg"

                // check if context is in suspended state (autoplay policy)
                if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }

                // play or pause track depending on state
                if (count % 2 === 1) {
                    console.log('playing');
                    recordAudio().then(function(record) {
                        record.stop().then(function(audio) {
                            audio.play();
                        });
                    });

                    waveformDisplay.appendChild(elem);
                    playBtn.style.backgroundImage = "url('assets/pause.svg')";
                    waveformDisplay.innerText = '';
                } else if (count % 2 === 0) {
                    console.log('paused');
                    recordAudio().then(function(record) {
                        record.stop().then(function(audio) {
                            audio.play();
                        });
                    });

                    playBtn.style.backgroundImage = "url('assets/playback.svg')";
                    waveformDisplay.innerText = 'Click Play!';
                    waveformDisplay.removeChild(elem);
                }
            }

        }, false);

        deleteBtn.addEventListener('click', function() {
            playBtn.style.display = "none";
            deleteBtn.style.display = "none";
            if (elem) {
                waveformDisplay.removeChild(elem);
            }
        });

        voiceOptions.addEventListener('click', function (e) {
            if (!currVoice) {
                currVoice = e.target.id;
            } else if (currVoice !== e.target.id) {
                // returns the images back to the default settings when a new div is clicked/selected
                switch (currVoice) {
                    case "troll":
                        document.getElementById(currVoice).style.borderColor = "#f30092";
                        document.getElementById(currVoice).style.backgroundImage = "url('assets/troll1.svg')";
                        break;
                    case "robot":
                        document.getElementById(currVoice).style.borderColor = "#7433ff";
                        document.getElementById(currVoice).style.backgroundImage = "url('assets/robot1.svg')";
                        break;
                    case "monster":
                        document.getElementById(currVoice).style.borderColor = "#33f3ff";
                        document.getElementById(currVoice).style.backgroundImage = "url('assets/monster1.svg')";
                        break;
                    default:
                        break;
                }

                currVoice = e.target.id;
            } else {
                // returns the default settings when clicking the same div again
                switch (e.target.id) {
                    case "troll":
                        document.getElementById(currVoice).style.borderColor = "#f30092";
                        document.getElementById(e.target.id).style.backgroundImage = "url('assets/troll1.svg')";
                        break;
                    case "robot":
                        document.getElementById(currVoice).style.borderColor = "#7433ff";
                        document.getElementById(e.target.id).style.backgroundImage = "url('assets/robot1.svg')";
                        break;
                    case "monster":
                        document.getElementById(currVoice).style.borderColor = "#33f3ff";
                        document.getElementById(e.target.id).style.backgroundImage = "url('assets/monster1.svg')";
                        break;
                    default:
                        break;
                }

                currVoice = '';
            }

            // changes border color and background img when the div is selected
            document.getElementById(currVoice).style.borderColor = "#11bbff";

            switch (currVoice) {
                case "troll":
                    document.getElementById(currVoice).style.backgroundImage = "url('assets/troll2.svg')";
                    break;
                case "robot":
                    document.getElementById(currVoice).style.backgroundImage = "url('assets/robot2.svg')";
                    break;
                case "monster":
                    document.getElementById(currVoice).style.backgroundImage = "url('assets/monster2.svg')";
                    break;
                default:
                    break;
            }

        });

    }

    const recordAudio = () => {
        return new Promise(resolve => {
            navigator.mediaDevices.getUserMedia({ audio: true, video: false })
                .then(stream => {
                    const mediaRecorder = new MediaRecorder(stream);
                    const audioChunks = [];

                    mediaRecorder.addEventListener("dataavailable", event => {
                        audioChunks.push(event.data);
                    });

                    const start = () => {
                        mediaRecorder.start();
                    };

                    const stop = () => {
                        return new Promise(resolve => {
                            mediaRecorder.addEventListener("stop", () => {
                                const audioBlob = new Blob(audioChunks);
                                const audioUrl = URL.createObjectURL(audioBlob);
                                const audio = new Audio(audioUrl);
                                const play = () => {
                                    audio.play();
                                };

                                resolve({ audioBlob, audioUrl, play });
                            });

                            mediaRecorder.stop();
                        });
                    };

                    resolve({ start, stop });
                });
        });
    };

    window.addEventListener("load", init);
}());
