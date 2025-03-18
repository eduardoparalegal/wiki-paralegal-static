document.addEventListener('DOMContentLoaded', function() {
    // Initialize all video players
    const videos = document.querySelectorAll('video');
    const playButtons = document.querySelectorAll('.play-btn');
    const sizeButtons = document.querySelectorAll('.size-btn');
    
    // Add play/pause functionality
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            const video = document.getElementById(videoId);
            
            if (video.paused) {
                video.play();
                this.textContent = 'Pause';
            } else {
                video.pause();
                this.textContent = 'Play';
            }
        });
    });
    
    // Add video size control functionality
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            const size = this.getAttribute('data-size');
            const video = document.getElementById(videoId);
            const videoPlayer = video.closest('.video-player');
            
            // Remove all size classes
            videoPlayer.classList.remove('video-small', 'video-medium', 'video-large');
            
            // Add the selected size class
            videoPlayer.classList.add(`video-${size}`);
            
            // Update active button
            const siblingButtons = this.parentElement.querySelectorAll('.size-btn');
            siblingButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Special handling for fullscreen
            if (size === 'large') {
                // Create exit fullscreen button if it doesn't exist
                if (!videoPlayer.querySelector('.exit-fullscreen')) {
                    const exitBtn = document.createElement('button');
                    exitBtn.classList.add('exit-fullscreen');
                    exitBtn.textContent = 'Exit Full Screen';
                    exitBtn.style.position = 'absolute';
                    exitBtn.style.top = '20px';
                    exitBtn.style.right = '20px';
                    exitBtn.style.zIndex = '1001';
                    exitBtn.style.backgroundColor = '#333';
                    exitBtn.style.color = '#fff';
                    exitBtn.style.border = 'none';
                    exitBtn.style.padding = '8px 15px';
                    exitBtn.style.borderRadius = '5px';
                    exitBtn.style.cursor = 'pointer';
                    
                    exitBtn.addEventListener('click', function() {
                        videoPlayer.classList.remove('video-large');
                        videoPlayer.classList.add('video-medium');
                        
                        // Update the active button to medium
                        const mediumBtn = document.querySelector(`[data-video="${videoId}"][data-size="medium"]`);
                        siblingButtons.forEach(btn => btn.classList.remove('active'));
                        mediumBtn.classList.add('active');
                        
                        // Remove exit button
                        this.remove();
                    });
                    
                    videoPlayer.appendChild(exitBtn);
                }
            } else {
                // Remove exit fullscreen button if not in fullscreen
                const exitBtn = videoPlayer.querySelector('.exit-fullscreen');
                if (exitBtn) {
                    exitBtn.remove();
                }
            }
        });
    });
    
    // Update play/pause button text when video plays or pauses
    videos.forEach(video => {
        const videoId = video.id;
        const playBtn = document.querySelector(`.play-btn[data-video="${videoId}"]`);
        
        video.addEventListener('play', function() {
            playBtn.textContent = 'Pause';
        });
        
        video.addEventListener('pause', function() {
            playBtn.textContent = 'Play';
        });
        
        // Handle video end
        video.addEventListener('ended', function() {
            playBtn.textContent = 'Play';
        });
    });
    
    // Add keyboard controls when in fullscreen
    document.addEventListener('keydown', function(e) {
        const fullscreenVideo = document.querySelector('.video-large video');
        if (fullscreenVideo) {
            // Escape key exits fullscreen
            if (e.key === 'Escape') {
                const videoPlayer = fullscreenVideo.closest('.video-player');
                videoPlayer.classList.remove('video-large');
                videoPlayer.classList.add('video-medium');
                
                // Update the active button to medium
                const videoId = fullscreenVideo.id;
                const mediumBtn = document.querySelector(`[data-video="${videoId}"][data-size="medium"]`);
                const siblingButtons = mediumBtn.parentElement.querySelectorAll('.size-btn');
                siblingButtons.forEach(btn => btn.classList.remove('active'));
                mediumBtn.classList.add('active');
                
                // Remove exit button
                const exitBtn = videoPlayer.querySelector('.exit-fullscreen');
                if (exitBtn) {
                    exitBtn.remove();
                }
            }
            
            // Space bar toggles play/pause
            if (e.key === ' ' || e.code === 'Space') {
                e.preventDefault();
                if (fullscreenVideo.paused) {
                    fullscreenVideo.play();
                } else {
                    fullscreenVideo.pause();
                }
            }
        }
    });
});