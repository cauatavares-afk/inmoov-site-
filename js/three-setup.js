import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.model = null;
        this.mixer = null;
        this.clock = new THREE.Clock();
        this.fingerRotations = {
            polegar: 0,
            indicador: 0,
            medio: 0,
            anelar: 0,
            mindinho: 0,
            pulso: 0
        };
        this.boneNames = {
            polegar: ['Thumb1', 'Thumb2', 'Thumb3'],
            indicador: ['Index1', 'Index2', 'Index3'],
            medio: ['Middle1', 'Middle2', 'Middle3'],
            anelar: ['Ring1', 'Ring2', 'Ring3'],
            mindinho: ['Pinky1', 'Pinky2', 'Pinky3'],
            pulso: ['Wrist']
        };
        this.isControlPage = window.location.pathname.includes('controlo.html');
        this.init();
    }

    init() {
        try {
            // Configurar renderer
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            
            const canvasContainer = document.getElementById('canvas-container');
            if (canvasContainer) {
                canvasContainer.appendChild(this.renderer.domElement);
            }

            // Configurar câmera
            this.camera.position.set(0, 1.5, 3);
            this.camera.lookAt(0, 1, 0);

            // Adicionar controles de órbita apenas na página de controle
            if (this.isControlPage) {
                this.controls = new OrbitControls(this.camera, this.renderer.domElement);
                this.controls.enableDamping = true;
                this.controls.dampingFactor = 0.05;
                this.controls.minDistance = 2;
                this.controls.maxDistance = 5;
                this.controls.maxPolarAngle = Math.PI / 2;
            }

            // Adicionar luzes
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            this.scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(5, 5, 5);
            directionalLight.castShadow = true;
            directionalLight.shadow.mapSize.width = 2048;
            directionalLight.shadow.mapSize.height = 2048;
            this.scene.add(directionalLight);

            // Carregar modelo apenas na página de controle
            if (this.isControlPage) {
                const loader = new GLTFLoader();
                const modelPath = './models/mano_hand_cyborg.glb';
                
                console.log('Loading model from:', modelPath);
                
                loader.load(
                    modelPath,
                    (gltf) => {
                        console.log('Model loaded successfully');
                        this.model = gltf.scene;
                        this.model.scale.set(0.03, 0.03, 0.03);
                        this.model.position.set(0, -1, 0);
                        this.model.rotation.set(0, Math.PI, 0);
                        this.model.traverse((node) => {
                            if (node.isMesh) {
                                node.castShadow = true;
                                node.receiveShadow = true;
                                node.material.metalness = 0.7;
                                node.material.roughness = 0.3;
                            }
                        });
                        this.scene.add(this.model);

                        // Configurar animações
                        this.mixer = new THREE.AnimationMixer(this.model);
                        if (gltf.animations.length > 0) {
                            this.action = this.mixer.clipAction(gltf.animations[0]);
                            this.action.play();
                        }

                        // Remover tela de carregamento
                        const loadingContainer = document.querySelector('.loading-container');
                        if (loadingContainer) {
                            loadingContainer.classList.add('hidden');
                            setTimeout(() => {
                                loadingContainer.style.display = 'none';
                            }, 500);
                        }
                    },
                    (xhr) => {
                        const progress = (xhr.loaded / xhr.total * 100);
                        console.log(progress + '% loaded');
                        
                        // Atualizar barra de progresso
                        const progressBar = document.querySelector('.loading-progress');
                        if (progressBar) {
                            progressBar.style.width = progress + '%';
                        }
                    },
                    (error) => {
                        console.error('Error loading model:', error);
                        
                        // Mostrar mensagem de erro
                        const loadingText = document.querySelector('.loading-text');
                        if (loadingText) {
                            loadingText.textContent = 'Erro ao carregar o modelo. Por favor, recarregue a página.';
                            loadingText.style.color = '#ff4444';
                        }
                    }
                );
            }

            // Adicionar listener para redimensionamento
            window.addEventListener('resize', () => this.onWindowResize(), false);

            // Iniciar animação
            this.animate();
        } catch (error) {
            console.error('Error initializing scene:', error);
        }
    }

    updateFingerRotation(finger, angle) {
        this.fingerRotations[finger] = angle;
        if (this.model) {
            const bones = this.boneNames[finger];
            bones.forEach(boneName => {
                const bone = this.model.getObjectByName(boneName);
                if (bone) {
                    bone.rotation.x = THREE.MathUtils.degToRad(angle);
                }
            });
        }
    }

    updateWristRotation(angle) {
        this.fingerRotations.pulso = angle;
        if (this.model) {
            const wrist = this.model.getObjectByName('Wrist');
            if (wrist) {
                wrist.rotation.y = THREE.MathUtils.degToRad(angle);
            }
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.mixer) {
            this.mixer.update(this.clock.getDelta());
        }

        if (this.controls) {
            this.controls.update();
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Exportar instância única
export const sceneManager = new SceneManager(); 