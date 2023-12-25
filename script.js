document.addEventListener("DOMContentLoaded", function() {
  const captureBtn = document.getElementById('capture-btn');
  const scanBtn = document.getElementById('scan-btn');
  const homeScreen = document.getElementById('home-screen');
  const cameraScreen = document.getElementById('camera-screen');
  const qrScreen = document.getElementById('qr-screen');
  const rewardScreen = document.getElementById('reward-screen');
  let videoStream = null;
  let videoElement = null;

  captureBtn.addEventListener('click', function() {
      navigateToScreen(cameraScreen);
      initializeCamera();
  });

  function initializeCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const constraints = { video: { facingMode: "environment" } };
          navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
              videoStream = stream;
              videoElement = document.createElement('video');
              videoElement.srcObject = stream;
              videoElement.play();
              cameraScreen.appendChild(videoElement);
          }).catch(function(error) {
              console.log("Error accessing camera:", error);
          });
      } else {
          console.log("Camera not supported");
      }
  }

  scanBtn.addEventListener('click', function() {
      if (!videoStream) {
          console.log("Camera not initialized");
          return;
      }
      navigateToScreen(qrScreen);
      startQRScanning();
  });

  function startQRScanning() {
      const canvasElement = document.createElement('canvas');
      const context = canvasElement.getContext('2d');
      qrScreen.appendChild(canvasElement);

      function scan() {
          if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
              canvasElement.height = videoElement.videoHeight;
              canvasElement.width = videoElement.videoWidth;
              context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
              const imageData = context.getImageData(0, 0, canvasElement.width, canvasElement.height);
              const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });

              if (code) {
                  console.log("QR Code found: ", code.data);
                  navigateToScreen(rewardScreen);
                  stopCamera();
              } else {
                  requestAnimationFrame(scan);
              }
          } else {
              requestAnimationFrame(scan);
          }
      }

      scan();
  }

  function stopCamera() {
      if (videoStream) {
          videoStream.getTracks().forEach(track => track.stop());
      }
      if (videoElement) {
          videoElement.remove();
      }
  }

  function navigateToScreen(screen) {
      [homeScreen, cameraScreen, qrScreen, rewardScreen].forEach(s => s.classList.add('hidden'));
      screen.classList.remove('hidden');
  }
});
