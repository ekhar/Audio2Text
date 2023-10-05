function gpt_prompt() {
    // Get the prompt from the input box
    var promptText = document.getElementById("prompt").value;
    const uploadedAudio = document.getElementById("audioFile");
    let name = uploadedAudio.value.split("\\")
    name = name[name.length - 1]
    // Send the prompt to the API
    fetch('http://127.0.0.1:5000/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: promptText,
            filename: name
        })
    })
        .then(response => {
            // Check if response is OK (status 200)
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Display the API response
            document.getElementById("apiResponse").innerText = JSON.stringify(data.result);
        })
        .catch((error) => {
            // This is where you run code if the server returns any errors
            console.error('Fetch Error:', error);
            document.getElementById("apiResponse").innerText = "An error occurred while calling the API";
        });
}
// Function to handle the file upload
function uploadAudio() {
    const audioFileInput = document.getElementById("audioFile");
    const uploadedAudio = document.getElementById("uploadedAudio");

    if (audioFileInput.files.length > 0) {
        const selectedAudioFile = audioFileInput.files[0];
        const objectURL = URL.createObjectURL(selectedAudioFile);

        // Clear any previous source elements
        while (uploadedAudio.firstChild) {
            uploadedAudio.removeChild(uploadedAudio.firstChild);
        }

        // Create a new source element and set its attributes
        const source = document.createElement("source");
        source.src = objectURL;
        source.type = selectedAudioFile.type;

        // Append the source element to the audio element
        uploadedAudio.appendChild(source);
    }
}

function upload_to_server() {
    uploadAudio()
    const audioFileInput = document.getElementById("audioFile");
    const uploadedAudio = document.getElementById("uploadedAudio");

    if (audioFileInput.files.length > 0) {
        const selectedAudioFile = audioFileInput.files[0];

        // Create a FormData object and append the selected file to it
        const formData = new FormData();
        formData.append("audioFile", selectedAudioFile);

        // Make a POST request to the backend API
        fetch("http://127.0.0.1:5000/api/upload", {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the backend, if needed
                console.log("Response from server:", data);
            })
            .catch(error => {
                console.error("Error:", error);
            });

        // Update the audio element to display the selected audio file
        const objectURL = URL.createObjectURL(selectedAudioFile);
        uploadedAudio.innerHTML = `<source src="${objectURL}" type="${selectedAudioFile.type}">`;
    }
}

function transcribe() {
    const uploadedAudio = document.getElementById("audioFile");
    let name = uploadedAudio.value.split("\\")
    name = name[name.length - 1]
    fetch("http://127.0.0.1:5000/api/transcribe", {
        method: "POST",
        body: name,
    })
        .then(response => response.json())
        .then(data => {
            // Display the API response
            document.getElementById("transcribeResponse").innerText = JSON.stringify(data.result);
        })
        .catch((error) => {
            // This is where you run code if the server returns any errors
            console.error('Fetch Error:', error);
            document.getElementById("transcribeResponse").innerText = "An error occurred while calling the API";
        });

}

