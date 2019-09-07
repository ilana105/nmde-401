(function () {
    "use strict";

    var audioCtx, audioElement;
    var currVoice, voiceOptions;
    var analyserNode, sourceNode;
    var compressor;
    var canvas;
    var playBtn, recordBtn, deleteBtn;
    var currRecording;

    function init() {
        audioCtx = new (window.AudioContext || window.webkitAudioContext);
        audioElement = document.querySelector('audio')
        analyserNode = audioCtx.createAnalyser();

        sourceNode = audioCtx.createMediaElementSource(audioElement);
        sourceNode.connect(analyserNode);
        analyserNode.connect(audioCtx.destination);

        canvas = document.querySelector('canvas');
        audioCtx = canvas.getContext('2d');

        playBtn = document.querySelector('#playBtn');
        recordBtn = document.querySelector('#recordBtn');
        voiceOptions = document.querySelector('.voiceOptions');
        // deleteBtn = document.querySelector('#deleteBtn');

        setUpEvents();
    }

    function setUpEvents() {
        let count = 0;
        recordBtn.addEventListener('click', function () {
            count++;
            // const recorder;

            if (count % 2 === 1) {
                console.log("recording now");
                (async () => {
                    currRecording = await recordAudio();
                    currRecording.start();
                })();
            }

            if (count % 2 === 0) {
                console.log("stopped recording");
                (async () => {
                    currRecording = await currRecording.stop();
                })();

                document.getElementById("playBtn").setAttribute("style", "display: block");
            }
        });

        playBtn.addEventListener('click', function () {
            // check if context is in suspended state (autoplay policy)
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            // play or pause track depending on state
            if (this.dataset.playing === 'false') {
                currRecording.play();
                this.dataset.playing = 'true';
            } else if (this.dataset.playing === 'true') {
                currRecording.pause();
                this.dataset.playing = 'false';
            }

        }, false);

        audioElement.addEventListener('ended', () => {
            playBtn.dataset.playing = 'false';
        }, false);

        voiceOptions.addEventListener('click', function(e) {
            if (!currVoice) {
                currVoice = e.target.id;
            } else if (currVoice !== e.target.id) {
                // returns the images back to the default settings when a new div is clicked/selected
                switch (currVoice) {
                    case "troll":
                        document.getElementById(currVoice).setAttribute("style", "border-color: #f30092;");
                        document.getElementById(currVoice).style.backgroundImage = "url('assets/troll1.svg')";
                        break;
                    case "robot":
                        document.getElementById(currVoice).setAttribute("style", "border-color: #7433ff;");
                        document.getElementById(currVoice).style.backgroundImage = "url('assets/robot1.svg')";
                        break;
                    case "monster":
                        document.getElementById(currVoice).setAttribute("style", "border-color: #33f3ff;");
                        document.getElementById(currVoice).style.backgroundImage = "url('assets/monster1.svg')";
                        break;
                    default:
                        break;
                }

                currVoice = e.target.id;
            } else {
                // returns the default settings when clicking the same div again
                switch (currVoice) {
                    case "troll":
                        document.getElementById(currVoice).setAttribute("style", "border-color: #f30092;");
                        document.getElementById(currVoice).style.backgroundImage = "url('assets/troll1.svg')";
                        break;
                    case "robot":
                        document.getElementById(currVoice).setAttribute("style", "border-color: #7433ff;");
                        document.getElementById(currVoice).style.backgroundImage = "url('assets/robot1.svg')";
                        break;
                    case "monster":
                        document.getElementById(currVoice).setAttribute("style", "border-color: #33f3ff;");
                        document.getElementById(currVoice).style.backgroundImage = "url('assets/monster1.svg')";
                        break;
                    default:
                        break;
                }

                currVoice = '';
            }

            // changes border color and background img when the div is selected
            document.getElementById(currVoice).setAttribute("style", "border-color: #11bbff;");
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
            navigator.mediaDevices.getUserMedia({ audio: true })
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

//https://github.com/mdn/web-dictaphone/blob/gh-pages/scripts/app.js
//https://mdn.github.io/web-dictaphone/