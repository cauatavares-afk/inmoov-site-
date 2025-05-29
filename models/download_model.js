const https = require('https');
const fs = require('fs');

const modelUrl = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/RobotExpressive/RobotExpressive.glb';
const outputPath = './robotic_hand.glb';

https.get(modelUrl, (response) => {
    const file = fs.createWriteStream(outputPath);
    response.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log('Model downloaded successfully!');
    });
}).on('error', (err) => {
    console.error('Error downloading model:', err);
}); 