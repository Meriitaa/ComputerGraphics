import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75,800/600);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(800,600);
document.body.appendChild(renderer.domElement);



//const geometry = new THREE.BoxGeometry(1,1,1);
//const material = new THREE.MeshBasicMaterial({color:0xff0000});
//const cubeMesh = new THREE.Mesh(geometry,material);

const geometry=new THREE.TorusGeometry(1,0.4,16,100);
//const geometry=new THREE.SphereGeometry(1,32,32);
//const geometry=new THREE.CylinderGeometry(1,1,2,32);
//const geometry=new THREE.ConeGeometry(1,2,10);

//basic material flat color ignore light 
//const material=new THREE.MeshBasicMaterial({color:0xff0000, wireframe:true});

//good for matte surfaces 
//const material=new THREE.MeshLambertMaterial({color:0xff00000});

//standart material physically based (ambient+diffuse+specular)
//controlled by 'metalness' and 'roughness' properties
//const material=new THREE.MeshStandardMaterial({
//    color:0x8844ff,
 //   metalness:0.4,
   // roughness:0.3,
   // emissive:0x220044,
//})


//Phong material- adds specular highlights (shiny reflections)
const material=new THREE.MeshPhongMaterial({
    color:0x8844ff,   //base color (diffuse component)
    specular:0xffffff,   //highlight color 
    //specular:0x000000,
    shininess:100    //size/intesity of the specular highlight
})


const object=new THREE.Mesh(geometry,material);
scene.add(object);


const ambientLight=new THREE.AmbientLight(0xffffff,0.3)
scene.add(ambientLight);

//scene.add(cubeMesh);

const directionalLight = new THREE.DirectionalLight(0xffffff,1.0);
directionalLight .position.set(1,1,5);
scene.add(directionalLight );

const lightHelper=new THREE.DirectionalLightHelper(directionalLight ,0.4);
scene.add(lightHelper)

// function animate(){
//     requestAnimationFrame(animate);
//     cubeMesh.rotation.x +=0.01;
//     cubeMesh.rotation.y +=0.01;
//     cubeMesh.rotation.z +=0.01;
//     renderer.render(scene,camera);

// }

function animate(){
    requestAnimationFrame(animate);
    object.rotation.x += 0.01;
    object.rotation.y += 0.01;
    object.rotation.z += 0.01;
    renderer.render(scene, camera);
}

animate();
