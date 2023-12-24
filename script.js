document.addEventListener('DOMContentLoaded', () => {
  const cameraStream = document.getElementById('cameraStream');
  const snapshotCanvas = document.getElementById('snapshot');
  const qrCanvas = document.getElementById('qrCanvas');
  const captureBtn = document.getElementById('captureBtn');
  const scanBtn = document.getElementById('scanBtn');
  const startCameraBtn = document.getElementById('startCameraBtn');
  const screens = document.querySelectorAll('.screen');

  function showScreen(screenIndex) {
      screens.forEach((screen, index) => {
          screen.style.display = index === screenIndex ? 'block' : 'none';
      });
  }

  function startCamera() {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
          .then(stream => {
              cameraStream.srcObject = stream;
              cameraStream.play();
              showScreen(0);
          })
          .catch(err => {
              console.error('Camera access error:', err);
              alert('Error accessing the camera. Please make sure you have given the necessary permissions.');
          });
  }

  startCameraBtn.addEventListener('click', startCamera);

  captureBtn.addEventListener('click', () => {
      const context = snapshotCanvas.getContext('2d');
      context.drawImage(cameraStream, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
      showScreen(1);
  });

  scanBtn.addEventListener('click', () => {
      const context = qrCanvas.getContext('2d');
      context.drawImage(cameraStream, 0, 0, qrCanvas.width, qrCanvas.height);
      const imageData = context.getImageData(0, 0, qrCanvas.width, qrCanvas.height);
      
      // Scan for QR Code using jsQR
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
          console.log(`Found QR code: ${code.data}`);
          showScreen(2); // Show the reward screen
          startRewardAnimation();
      } else {
          console.log("No QR code found.");
          alert("No QR code found. Please try again.");
      }
  });

  function startRewardAnimation() {
      // Placeholder for reward animation logic
      console.log("Starting reward animation...");
  }
});
