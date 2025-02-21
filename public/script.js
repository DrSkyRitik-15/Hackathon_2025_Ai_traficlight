let model;
const video = document.getElementById("camera-feed");
const canvas = document.getElementById("capture-canvas");
const ctx = canvas.getContext("2d");
let isProcessing = false; // Prevents multiple detections at once
let hasCaptured = false; // Ensures image is captured only once per cycle

// ✅ Load AI Model
async function loadModel() {
    try {
        model = await cocoSsd.load();
        console.log("✅ AI Model Loaded!");
    } catch (error) {
        console.error("❌ Error loading model:", error);
    }
}

// ✅ Start Camera Feed
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            video.play();
            detectObjects(); // Start detection when video loads
        };
        console.log("🎥 Camera started!");
    } catch (error) {
        console.error("🚨 Camera access denied:", error);
    }
}

// ✅ Detect Objects & Capture Image Once
async function detectObjects() {
    if (!model || video.videoWidth === 0 || video.videoHeight === 0) {
        console.log("⏳ Waiting for video...");
        setTimeout(detectObjects, 500);
        return;
    }

    const predictions = await model.detect(video);
    const filtered = predictions.filter(pred => pred.class === "car" || pred.class === "motorbike");

    if (filtered.length > 0 && !isProcessing) {
        isProcessing = true; // Prevent multiple triggers
        console.log("🚗 Car/Bike Detected! Turning Red...");
        changeTrafficLight("red");
        speakAlert("Stop  Be Carefull Car coming, don't cross the road! you should wait for stop"); // 🔊 Speak Alert

        if (!hasCaptured) {
            captureImage(); // Capture Image When Car/Bike is Detected
            hasCaptured = true; // Prevent Multiple Captures
        }

        // 🚦 Wait 5 seconds, then switch to Yellow
        setTimeout(() => {
            console.log("⚠ Turning Yellow...");
            changeTrafficLight("yellow");

            // 🚦 After another 5 sec, switch to Green
            setTimeout(() => {
                console.log("✅ Turning Green...");
                changeTrafficLight("green");
                isProcessing = false; // Allow new detections
                hasCaptured = false; // Reset capture flag when light turns green
            }, 5000);

        }, 5000);

    } else if (filtered.length === 0 && !isProcessing) {
        console.log("✅ No Vehicles, Keeping Green.");
        changeTrafficLight("green");
    }

    requestAnimationFrame(detectObjects); // Keep detecting in real time
}

// ✅ Capture Image from Video (One-time Per Detection)
function captureImage() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    console.log("📸 Image Captured!");

    // Automatically download the captured image
    const imageData = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = imageData;
    downloadLink.download = `captured_vehicle_${Date.now()}.png`;
    downloadLink.click();
}

// ✅ Voice Alert for Car/Bike Detection
function speakAlert(message) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US"; // Set language
    speech.volume = 1; // Set volume (0 to 1)
    speech.rate = 1; // Set speaking speed
    speech.pitch = 1; // Set pitch
    window.speechSynthesis.speak(speech);
}

// ✅ Change Traffic Light
function changeTrafficLight(color) {
    const trafficLight = document.querySelector(".traffic-light");
    trafficLight.classList.remove("red", "yellow", "green");
    trafficLight.classList.add(color);
}

// ✅ Start Button Click Event (Prevents Multiple Clicks)
document.getElementById("start").addEventListener("click", async function() {
    this.disabled = true; // Prevent multiple clicks
    console.log("🚀 Starting Detection...");
    await loadModel(); // Load AI Model First
    await startCamera(); // Then Start Camera
});
