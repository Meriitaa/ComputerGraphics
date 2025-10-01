import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:0xff0000});
const cubeMesh = new THREE.Mesh(geometry,material);

//scene.add(cubeMesh);

//cubeMesh.position.x = 0.7;
//cubeMesh.position.y = -0.6;
//cubeMesh.position.z = 1;

//cubeMesh.position.set(0.7,-0.6,1);//x,y,z

//console.log("Distance of cube from camera", cubeMesh.position.distanceTo(camera.position));

//Axes helper
const axes=new THREE.AxesHelper(14)
scene.add(axes)


//scaling objects
//cubeMesh.scale.x=2
//cubeMesh.scale.y=0.25
//cubeMesh.scale.z=0.5

//Rotating 
//cubeMesh.rotation.x=Math.PI*0.25
//cubeMesh.rotation.y=Math.PI*0.25


//cubeMesh.position.x=0.7
//cubeMesh.position.y=-0.6
//cubeMesh.position.z=1
//cubeMesh.scale.x=2
//cubeMesh.scale.y=0.25
//cubeMesh.scale.z=0.5
//cubeMesh.rotation.x=Math.PI*0.25
//cubeMesh.rotation.y=Math.PI*0.25

const group=new THREE.Group()
// group.scale.y=2
// group.rotation.y=0.2
scene.add(group)

// 1️ Cylinder
const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(0.7, 0.7, 2, 32), // radiusTop, radiusBottom, height, segments
    new THREE.MeshBasicMaterial({color: 0xffff00})
);
cylinder.position.x = -3;
group.add(cylinder);

// 2Sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 32, 32),
    new THREE.MeshBasicMaterial({color:0x0000ff})
);
sphere.position.x = 0;
group.add(sphere);

const capsule = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.5, 1, 1, 1),
    new THREE.MeshBasicMaterial({color:0x00ff00})
);
capsule.position.x = 3;
group.add(capsule);



const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(2,2,5);
scene.add(light);

function animate(){
    requestAnimationFrame(animate);
    // cubeMesh.rotation.x +=0.01;
    // cubeMesh.rotation.y +=0.01;
    //cubeMesh.rotation.z +=0.01;
    renderer.render(scene,camera);

}

animate();
