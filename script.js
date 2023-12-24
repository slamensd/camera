document.addEventListener('DOMContentLoaded', () => {
  const cameraStream = document.getElementById('cameraStream');
  const snapshotCanvas = document.getElementById('snapshot');
  const scanQRBtn = document.getElementById('scanQR');
  const startCaptureBtn = document.getElementById('startCapture');
  const screens = document.querySelectorAll('.screen');

  function showScreen(screenIndex) {
    screens.forEach((screen, index) => {
      screen.style.display = index === screenIndex ? 'flex' : 'none';
    });
  }

  function startCamera() {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        cameraStream.srcObject = stream;
        cameraStream.play();
        showScreen(0);
      })
      .catch((err) => {
        console.error('Camera access error:', err);
        alert('Error accessing the camera. Please make sure you have given the necessary permissions.');
      });
  }

  startCaptureBtn.addEventListener('click', () => {
    startCamera();
  });

  scanQRBtn.addEventListener('click', () => {
    const context = snapshotCanvas.getContext('2d');
    context.drawImage(cameraStream, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
    showScreen(1);
  });

  snapshotCanvas.addEventListener('click', () => {
    showScreen(2); // Transition to the reward animation screen
    startRewardAnimation();
  });

  function startRewardAnimation() {
    // Placeholder for reward animation logic
    console.log('Starting reward animation...');
  }
});
