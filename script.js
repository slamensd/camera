// script.js
document.addEventListener('DOMContentLoaded', function() {
    const video = document.createElement('video');
    const canvasElement = document.createElement('canvas');
    const canvas = canvasElement.getContext('2d');
    const scannerArea = document.querySelector('.scanner-area');
    const photoLibraryButton = document.getElementById('photo-library');
    const settingsButton = document.getElementById('settings');

    // Insert video element into the DOM
    scannerArea.appendChild(video);
    video.style.width = '100%';
    video.style.height = 'auto';

    // Insert canvas element into the DOM, but do not display it
    scannerArea.appendChild(canvasElement);
    canvasElement.style.display = 'none';

    // Access the device camera and stream to video element
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(function(stream) {
            video.srcObject = stream;
            video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
            video.play();
            requestAnimationFrame(scanQRCode);
        })
        .catch(function(err) {
            console.error("Error accessing the camera", err);
        });

    function scanQRCode() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvasElement.height = video.videoHeight;
            canvasElement.width = video.videoWidth;
            canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
            const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
            
            // Use jsQR to decode the image data
            const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });
            
            if (qrCode) {
                console.log("Found QR code", qrCode.data);
                // Process the QR code data, stop the camera, and play the animation
                video.pause();
                stream.getTracks().forEach(track => track.stop()); // Stop camera stream
                playInterstitialAnimation(qrCode.data);
            } else {
                requestAnimationFrame(scanQRCode); // No QR code found, continue scanning
            }
        }
    }

    function playInterstitialAnimation(qrData) {
        // Placeholder for full-screen interstitial animation
        // Implement the animation using CSS or JavaScript here
        console.log('Playing interstitial animation with QR Code data:', qrData);
        // Here you might want to redirect the user or display the QR code data
    }

    // Event listeners for touch events on bottom icons
    photoLibraryButton.addEventListener('touchstart', function() {
        // Code to open the photo library goes here
        console.log('Photo library button tapped.');
    });

    settingsButton.addEventListener('touchstart', function() {
        // Code for opening settings goes here
        console.log('Settings button tapped.');
    });
});