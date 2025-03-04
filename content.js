// Initialize SpeechRecognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.interimResults = false;
recognition.lang = "en-US";

// Event listener for voice recognition results
recognition.onresult = function (event) {
    let voiceCommand = event.results[0][0].transcript.toLowerCase();
    console.log("User said:", voiceCommand);

    // Handle specific commands
    if (voiceCommand.includes("search for")) {
        let query = voiceCommand.replace("search for", "").trim();
        chrome.runtime.sendMessage({ action: "searchGoogle", query: query });
    } else if (voiceCommand.includes("read this")) {
        let headlines = document.querySelectorAll("h1, h2, h3");
        let textToRead = "";
        headlines.forEach(headline => textToRead += headline.innerText + ". ");
        let speech = new SpeechSynthesisUtterance(textToRead);
        speech.lang = "en-US";
        speech.rate = 1;
        speechSynthesis.speak(speech);
    }
};

// Start voice recognition when the user presses the 'V' key
document.addEventListener("keydown", function (event) {
    if (event.key === "v") {
        recognition.start();
    }
});