document.addEventListener('DOMContentLoaded', function() {
    // Media interaction
    const mediaWrapper = document.querySelector('.media-wrapper');
    const mediaElement = document.querySelector('.media');
    const playButton = document.querySelector('.play-button');
    
    // Toggle hidden content
    const toggleButton = document.querySelector('.toggle-button');
    const hiddenContent = document.querySelector('.hidden-content');
    
    // Media interaction
    if (mediaWrapper && playButton) {
        mediaWrapper.addEventListener('click', function() {
            mediaElement.classList.remove('hidden');
            playButton.style.display = 'none';
            
            // Simulate video play
            // In a real implementation, you would replace the image with a video
            // or iframe and start playing it
            const loadingAnimation = document.createElement('div');
            loadingAnimation.className = 'loading-animation';
            loadingAnimation.innerHTML = '<span>Loading...</span>';
            loadingAnimation.style.position = 'absolute';
            loadingAnimation.style.top = '50%';
            loadingAnimation.style.left = '50%';
            loadingAnimation.style.transform = 'translate(-50%, -50%)';
            loadingAnimation.style.color = '#fff';
            loadingAnimation.style.fontSize = '1.2rem';
            mediaWrapper.appendChild(loadingAnimation);
            
            setTimeout(() => {
                loadingAnimation.remove();
                mediaElement.style.opacity = '1';
                
                // Create a message to show video would play in real implementation
                const message = document.createElement('div');
                message.className = 'video-message';
                message.textContent = 'Video estaría reproduciéndose aquí';
                message.style.position = 'absolute';
                message.style.top = '50%';
                message.style.left = '50%';
                message.style.transform = 'translate(-50%, -50%)';
                message.style.color = '#fff';
                message.style.backgroundColor = 'rgba(0,0,0,0.7)';
                message.style.padding = '15px 30px';
                message.style.borderRadius = '4px';
                message.style.fontSize = '1.3rem';
                message.style.fontWeight = '300';
                mediaWrapper.appendChild(message);
                
                setTimeout(() => {
                    message.style.opacity = '0';
                    message.style.transition = 'opacity 1s ease';
                }, 2000);
            }, 1000);
        });
    }
    
    // Toggle hidden content
    if (toggleButton && hiddenContent) {
        toggleButton.addEventListener('click', function() {
            hiddenContent.classList.toggle('active');
            
            if (hiddenContent.classList.contains('active')) {
                toggleButton.textContent = 'Ver menos';
            } else {
                toggleButton.textContent = 'Ver más';
            }
        });
    }
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.content-block');
        
        elements.forEach((element, index) => {
            const position = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (position < windowHeight * 0.85) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    };
    
    // Initial animation
    setTimeout(animateOnScroll, 100);
    
    // Scroll event
    window.addEventListener('scroll', animateOnScroll);
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.interactive-element, .media-wrapper');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});