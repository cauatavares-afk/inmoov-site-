// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('DOMContentLoaded', () => {
    try {
        // Custom cursor functionality
        if (cursor && cursorFollower) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                setTimeout(() => {
                    cursorFollower.style.left = e.clientX + 'px';
                    cursorFollower.style.top = e.clientY + 'px';
                }, 100);
            });

            // Add hover effect for links and buttons
            const links = document.querySelectorAll('a, button, .menu-toggle');
            links.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(1.5)';
                    cursorFollower.style.transform = 'scale(1.5)';
                });
                
                link.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                    cursorFollower.style.transform = 'scale(1)';
                });
            });
        }

        // Menu functionality
        const menuToggle = document.querySelector('.menu-toggle');
        const menuOverlay = document.querySelector('.menu-overlay');

        if (menuToggle && menuOverlay) {
            menuToggle.addEventListener('click', () => {
                menuOverlay.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });

            // Menu links
            const menuLinks = document.querySelectorAll('.menu-content a');
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menuOverlay.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }

        // Video Carousel (only if elements exist)
        const carousel = document.querySelector('.video-carousel');
        const prevButton = document.querySelector('.carousel-nav .prev');
        const nextButton = document.querySelector('.carousel-nav .next');
        
        if (carousel && prevButton && nextButton) {
            let currentIndex = 0;
            const items = carousel.querySelectorAll('.video-item');
            const itemWidth = items[0].offsetWidth;
            
            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
            
            nextButton.addEventListener('click', () => {
                if (currentIndex < items.length - 1) {
                    currentIndex++;
                    updateCarousel();
                }
            });
            
            function updateCarousel() {
                carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            }
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Loading animation
        const loading = document.querySelector('.loading-container');
        if (loading) {
            window.addEventListener('load', () => {
                loading.classList.add('hidden');
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 500);
            });
        }
    } catch (error) {
        console.error('Error initializing main script:', error);
    }
});

// Video carousel
const carousel = document.querySelector('.video-carousel');
const prevButton = document.querySelector('.carousel-nav .prev');
const nextButton = document.querySelector('.carousel-nav .next');
let currentSlide = 0;
const slideCount = document.querySelectorAll('.video-item').length;

function updateCarousel() {
    const offset = -currentSlide * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slideCount;
    updateCarousel();
}); 