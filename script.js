document.addEventListener('DOMContentLoaded', () => {
  const screen1 = document.getElementById('screen1');
  const screen2 = document.getElementById('screen2');
  const screen3 = document.getElementById('screen3');
  const cameraStream = document.getElementById('cameraStream');
  const qrCameraStream = document.getElementById('qrCameraStream');
  const captureBtn = document.getElementById('captureBtn');
  const scanQRBtn = document.getElementById('scanQRBtn');

  function showScreen(screenElement) {
    screen1.style.display = 'none';
    screen2.style.display = 'none';
    screen3.style.display = 'none';
    screenElement.style.display = 'block';
  }

  function startCamera(stream, targetVideoElement) {
    targetVideoElement.srcObject = stream;
    targetVideoElement.play();
    showScreen(screen2);
  }

  function startQRScanner(stream) {
    startCamera(stream, qrCameraStream);
  }

  captureBtn.addEventListener('click', () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        startCamera(stream, cameraStream);
      })
      .catch((err) => {
        console.error('Camera access error:', err);
        alert('Error accessing the camera. Please make sure you have given the necessary permissions.');
      });
  });

  scanQRBtn.addEventListener('click', () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        startQRScanner(stream);
      })
      .catch((err) => {
        console.error('Camera access error:', err);
        alert('Error accessing the camera. Please make sure you have given the necessary permissions.');
      });
  });
});
