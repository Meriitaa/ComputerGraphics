import * as THREE from 'three';


const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z=3;

const renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader=new THREE.TextureLoader();
const texture=textureLoader.load('textures/Stylized_Stone_Floor_010_normal.png');



// texture.wrapS=THREE.RepeatWrapping;
// texture.wrapT=THREE.RepeatWrapping;
// texture.repeat.set(2,10);


const material=new THREE.MeshBasicMaterial({map:texture});
const donut=new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 100), 
    material
);
scene.add(donut);

function animate(){
    requestAnimationFrame(animate);
    donut.rotation.x += 0.01;
    donut.rotation.y += 0.02;
    renderer.render(scene,camera);
}

animate();