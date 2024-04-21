


let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceChangeButton = document.querySelector("select")

window.speechSynthesis.onvoiceschanged = () => {
    voices  = window.speechSynthesis.getVoices()
    speech.voice = voices[0];
    voices.forEach((voice, i ) => (voiceChangeButton.options[i]) =  new Option(voice.name, [i]))
}

voiceChangeButton.addEventListener('change', e=> speech.voice = voices[e.target.value]);

document.querySelector("button").addEventListener('click', function() {
    const textToSpeak = document.getElementById("text-to-speak").value;
    // Check if there is any text to speak of, otherwise stop execution and return an error message
    if (textToSpeak === ""){
        const toast = Toastify({
            text: "Empty text area",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                display:"flex",
                alignItem:"center",
                marginRight:"45%",
                justifyContent:"center",
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          });
          toast.showToast();
        return false;
    } else {
        speech.text = textToSpeak;
        window.speechSynthesis.speak(speech);
    }
});

// const audioChunks = [];
// let mediaRecorder;

// const startRecording = () => {
//   const stream = new MediaStream();
//   const source = window.AudioContext.createMediaStreamSource(stream);
//   const destination = new window.AudioContext.MediaStreamDestination();
//   source.connect(destination);
//   mediaRecorder = new MediaRecorder(destination.stream);
//   mediaRecorder.addEventListener("dataavailable", (event) => {
//     audioChunks.push(event.data);
//   });
//   mediaRecorder.start();
// };

// const stopRecording = () => {
//   return new Promise((resolve) => {
//     mediaRecorder.addEventListener("stop", () => {
//       const audioBlob = new Blob(audioChunks);
//       audioChunks.length = 0;
//       const audioUrl = URL.createObjectURL(audioBlob);
//       const a = document.createElement("a");
//       a.style.display = "none";
//       a.href = audioUrl;
//       a.download = "speech.wav";
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(audioUrl);
//       document.body.removeChild(a);
//       resolve();
//     });
//     mediaRecorder.stop();
//   });
// };

// document.querySelector("#download-button").addEventListener("click", async () => {
//     startRecording();
//     await stopRecording();
//   });