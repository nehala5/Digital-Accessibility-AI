// Add event listener to the "Start Listening" button
document.getElementById("start-btn").addEventListener("click", () => {
    console.log("Voice recognition started from popup");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: startVoiceRecognition
        });
    });
});

// Function to start voice recognition
function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = function () {
        console.log("Voice recognition started...");
    };

    recognition.onresult = function (event) {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        console.log("Heard:", transcript);

        // Handle specific commands
        if (transcript.includes("search for")) {
            let query = transcript.replace("search for", "").trim();
            chrome.runtime.sendMessage({ action: "searchGoogle", query: query });
        } else if (transcript.includes("read this")) {
            let headlines = document.querySelectorAll("h1, h2, h3");
            let textToRead = "";
            headlines.forEach(headline => textToRead += headline.innerText + ". ");
            let speech = new SpeechSynthesisUtterance(textToRead);
            speech.lang = "en-US";
            speech.rate = 1;
            speechSynthesis.speak(speech);
        }
    };

    recognition.onerror = function (event) {
        console.error("Recognition error:", event.error);
    };

    recognition.start();
}