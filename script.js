// script.js
document.addEventListener('DOMContentLoaded', function() {
    const video = document.createElement('video');
    const canvasElement = document.createElement('canvas');
    const scannerArea = document.querySelector('.scanner-area');
    const photoLibraryButton = document.getElementById('photo-library');
    const settingsButton = document.getElementById('settings');

    // Insert video element into the DOM
    scannerArea.appendChild(video);
    video.style.width = '100%';
    video.style.height = 'auto';

    // Insert canvas element into the DOM
    scannerArea.appendChild(canvasElement);
    canvasElement.style.display = 'none';

    // Access the device camera and stream to video element
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(function(stream) {
            video.srcObject = stream;
            video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
            video.play();
            requestAnimationFrame(tick);
        })
        .catch(function(err) {
            console.error("Error accessing the camera", err);
        });

    function tick() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvasElement.height = video.videoHeight;
            canvasElement.width = video.videoWidth;
            const ctx = canvasElement.getContext('2d');
            ctx.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
            
            // Here we would use the jsQR library to scan the canvas for QR codes
            // For demonstration, let's assume it finds a QR code and we call playInterstitialAnimation
            // In production, you would replace this with actual QR code scanning logic
            const code = true; // This should be the result from jsQR
            if (code) {
                video.pause();
                stream.getTracks().forEach(track => track.stop()); // Stop camera stream
                playInterstitialAnimation();
            } else {
                requestAnimationFrame(tick); // Keep scanning for QR codes
            }
        }
    }

    function playInterstitialAnimation() {
        // Placeholder for full-screen interstitial animation
        // Implement the animation using CSS or JavaScript here
        console.log('Playing interstitial animation...');
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