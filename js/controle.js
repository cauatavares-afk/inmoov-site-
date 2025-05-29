import { sceneManager } from './three-setup.js';

document.addEventListener('DOMContentLoaded', () => {
    // Selecionar todos os sliders
    const sliders = document.querySelectorAll('input[type="range"]');
    
    // Configurar valores iniciais e displays
    sliders.forEach(slider => {
        const value = slider.value;
        const display = slider.nextElementSibling;
        if (display) {
            display.textContent = `${value}°`;
        }
    });

    // Adicionar listeners para cada slider
    sliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            const display = e.target.nextElementSibling;
            if (display) {
                display.textContent = `${value}°`;
                display.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    display.style.transform = 'scale(1)';
                }, 200);
            }

            // Atualizar rotação do modelo
            const finger = e.target.id;
            if (finger === 'pulso') {
                sceneManager.updateWristRotation(parseFloat(value));
            } else {
                sceneManager.updateFingerRotation(finger, parseFloat(value));
            }
        });

        // Adicionar efeito visual ao usar o slider
        slider.addEventListener('mousedown', () => {
            slider.classList.add('active');
        });

        slider.addEventListener('mouseup', () => {
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseleave', () => {
            slider.classList.remove('active');
        });
    });

    // Adicionar efeito de hover no container do canvas
    const canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer) {
        canvasContainer.addEventListener('mousemove', (e) => {
            const rect = canvasContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Atualizar posição da câmera baseado no mouse
            sceneManager.camera.position.x = THREE.MathUtils.lerp(-2, 2, x);
            sceneManager.camera.position.y = THREE.MathUtils.lerp(2, 0, y);
            sceneManager.camera.lookAt(0, 0, 0);
        });
    }

    // Adicionar controles de teclado
    document.addEventListener('keydown', (e) => {
        const activeSlider = document.activeElement;
        if (activeSlider && activeSlider.type === 'range') {
            const step = 5;
            const currentValue = parseFloat(activeSlider.value);
            
            if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
                activeSlider.value = Math.min(parseFloat(activeSlider.max), currentValue + step);
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
                activeSlider.value = Math.max(parseFloat(activeSlider.min), currentValue - step);
            }
            
            // Disparar evento de input para atualizar o modelo
            activeSlider.dispatchEvent(new Event('input'));
        }
    });

    // Adicionar botão de reset
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            sliders.forEach(slider => {
                slider.value = 0;
                const display = slider.nextElementSibling;
                if (display) {
                    display.textContent = '0°';
                }
                slider.dispatchEvent(new Event('input'));
            });
        });
    }
}); 