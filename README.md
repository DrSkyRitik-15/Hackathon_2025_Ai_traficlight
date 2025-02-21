# Hackathon_2025_Ai_traficlight
This project utilizes the COCO-SSD AI model with JavaScript and TensorFlow.js to detect vehicles (cars and motorbikes) in real-time using a webcam feed. Once a vehicle is detected:
🚦 AI-Based Traffic Light Control Using COCO-SSD
Real-time vehicle detection for smart traffic optimization!

📌 Overview
This project uses COCO-SSD (Common Objects in Context - Single Shot MultiBox Detector) to detect vehicles (cars and motorbikes) in a live webcam feed. When a vehicle is detected:
✔ The traffic light turns red.
✔ A voice alert warns pedestrians.
✔ The system captures an image of the vehicle.
✔ The traffic light transitions from Red → Yellow → Green automatically.

🛠 Technologies Used
TensorFlow.js – AI model for object detection
COCO-SSD – Pre-trained model for real-time object detection
JavaScript, HTML, CSS – Frontend technologies
Web Speech API – For voice alerts
Canvas API – To capture images
📂 Project Structure
bash
Copy
Edit

🎥 How It Works
1️⃣ Click the Start Detection button.
2️⃣ The AI model loads and the camera feed starts.
3️⃣ If a car or motorbike is detected:

The traffic light turns red.
A voice alert warns pedestrians.
An image of the vehicle is captured and auto-downloaded.
4️⃣ After 5 seconds, the light turns yellow.
5️⃣ After another 5 seconds, the light turns green, allowing new detections.
📸 Screenshot


🚀 How to Run the Project

Open index.html in a browser (Chrome recommended).
Click Start Detection to begin.
🔧 Future Enhancements
Add real-time vehicle counting.
Integrate with IoT traffic lights.
Improve detection accuracy with custom AI models.
