class VideoCarousel {
    constructor() {
        this.carousel = document.querySelector('.video-carousel');
        this.items = document.querySelectorAll('.video-item');
        this.currentIndex = 0;
        this.isAnimating = false;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        // Add touch events for mobile
        this.carousel.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        });

        this.carousel.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });

        // Add click events for video items
        this.items.forEach((item, index) => {
            const overlay = item.querySelector('.video-overlay');
            overlay.addEventListener('click', () => {
                this.playVideo(index);
            });
        });

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previous();
            } else if (e.key === 'ArrowRight') {
                this.next();
            }
        });
    }

    handleSwipe() {
        const swipeDistance = this.touchEndX - this.touchStartX;
        const minSwipeDistance = 50;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                this.previous();
            } else {
                this.next();
            }
        }
    }

    next() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateCarousel();
    }

    previous() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateCarousel();
    }

    updateCarousel() {
        const offset = -this.currentIndex * 100;
        this.carousel.style.transform = `translateX(${offset}%)`;

        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    playVideo(index) {
        const item = this.items[index];
        const videoUrl = item.dataset.videoUrl;
        
        if (videoUrl) {
            // Create modal for video
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            
            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-container';
            
            const video = document.createElement('video');
            video.src = videoUrl;
            video.controls = true;
            video.autoplay = true;
            
            const closeButton = document.createElement('button');
            closeButton.className = 'close-button';
            closeButton.innerHTML = '×';
            
            videoContainer.appendChild(video);
            videoContainer.appendChild(closeButton);
            modal.appendChild(videoContainer);
            document.body.appendChild(modal);
            
            // Close modal on click
            closeButton.addEventListener('click', () => {
                modal.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideoCarousel();
}); 