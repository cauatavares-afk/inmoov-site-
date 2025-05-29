import { sceneManager } from './three-setup.js';

document.addEventListener('DOMContentLoaded', () => {
    // Get all letter items
    const letterItems = document.querySelectorAll('.letter-item');
    
    // Add click event to each letter
    letterItems.forEach(item => {
        const letter = item.dataset.letter;
        const playButton = item.querySelector('.play-button');
        
        // Play animation when clicking the letter item or play button
        const playAnimation = () => {
            // Add active state
            letterItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Play the animation
            sceneManager.playLetterAnimation(letter);
            
            // Update play button
            playButton.textContent = '⏸';
        };
        
        item.addEventListener('click', playAnimation);
        playButton.addEventListener('click', (e) => {
            e.stopPropagation();
            playAnimation();
        });
    });

    // Add hover effect to canvas container
    const canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer) {
        canvasContainer.addEventListener('mousemove', (e) => {
            const rect = canvasContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Update camera position based on mouse position
            sceneManager.camera.position.x = (x - 0.5) * 2;
            sceneManager.camera.position.y = (y - 0.5) * 2;
            sceneManager.camera.lookAt(0, 0, 0);
        });
    }
}); 