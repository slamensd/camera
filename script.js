document.addEventListener('DOMContentLoaded', () => {
  const snapshotCanvas = document.getElementById('snapshot');
  const qrCanvas = document.getElementById('qrCanvas');
  const captureBtn = document.getElementById('captureBtn');
  const scanBtn = document.getElementById('scanBtn');
  const startCameraBtn = document.getElementById('startCameraBtn');
  const imageInput = document.getElementById('imageInput');
  const screens = document.querySelectorAll('.screen');

  function showScreen(screenIndex) {
    screens.forEach((screen, index) => {
      screen.style.display = index === screenIndex ? 'block' : 'none';
    });
  }

  function startCamera() {
    showScreen(0);
  }

  startCameraBtn.addEventListener('click', () => {
    // Trigger image input dialog when the button is clicked
    imageInput.click();
  });

  // Handle image selection from the file input
  imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const image = new Image();
        image.src = event.target.result;
        image.onload = function () {
          const context = snapshotCanvas.getContext('2d');
          snapshotCanvas.width = image.width;
          snapshotCanvas.height = image.height;
          context.drawImage(image, 0, 0);
          showScreen(1);
        };
      };
      reader.readAsDataURL(file);
    }
  });

  scanBtn.addEventListener('click', () => {
    const context = qrCanvas.getContext('2d');
    context.drawImage(snapshotCanvas, 0, 0, qrCanvas.width, qrCanvas.height);
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
