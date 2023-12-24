// script.js
document.addEventListener('DOMContentLoaded', () => {
  const cameraStream = document.getElementById('cameraStream');
  const snapshotCanvas = document.getElementById('snapshot');
  const qrCanvas = document.getElementById('qrCanvas');
  const captureBtn = document.getElementById('captureBtn');
  const scanBtn = document.getElementById('scanBtn');
  const screens = document.querySelectorAll('.screen');
  const closeIcons = document.querySelectorAll('.close-icon');

  // Function to show only the active screen
  function showScreen(screenIndex) {
    screens.forEach((screen, index) => {
      screen.style.display = index === screenIndex ? 'block' : 'none';
    });
  }

  // Close icons event
  closeIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
      showScreen(index === 0 ? null : index - 1); // Go back to the previous screen or hide all if it's the first screen
    });
  });

  // Camera stream setup
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(stream => {
      cameraStream.srcObject = stream;
      cameraStream.play();
      showScreen(0); // Show the first screen
    })
    .catch(err => {
      console.error('An error occurred: ' + err);
      alert('Error accessing the camera. Please make sure you have given the necessary permissions.');
    });

  // Capture Button Event
  captureBtn.addEventListener('click', () => {
    const context = snapshotCanvas.getContext('2d');
    context.drawImage(cameraStream, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
    showScreen(1); // Show the second screen
  });

  // QR Code Scan Event
  scanBtn.addEventListener('click', () => {
    const context = qrCanvas.getContext('2d');
    context.drawImage(cameraStream, 0, 0, qrCanvas.width, qrCanvas.height);

    // Get image data from canvas
    const imageData = context.getImageData(0, 0, qrCanvas.width, qrCanvas.height);

    // Scan for QR Code
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });

    if (code) {
      console.log(`Found QR code: ${code.data}`);
      showScreen(2); // Show the third screen
      startRewardAnimation();
    } else {
      console.error('No QR code found.');
      alert('No QR code found. Please try again.');
    }
  });

  function startRewardAnimation() {
    const coinAnimation = document.getElementById('coinAnimation');
    coinAnimation.classList.add('spin');
  }
});
