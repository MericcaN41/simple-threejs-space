import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, TextureLoader, SphereGeometry, PlaneGeometry, MeshLambertMaterial, Group, AmbientLight, DirectionalLight, MeshPhongMaterial } from "three";
const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, .01, 1000);
const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);
const earthTexture = new TextureLoader().load("./earth.jpg")
const smokeTexture = new TextureLoader().load("./smoke.png");
const sunLight = new DirectionalLight("white", 1)
const ambient = new AmbientLight("white", .25);
sunLight.position.x = 4
sunLight.position.z = 3
scene.add(sunLight)
scene.add(ambient)

window.addEventListener("resize", e => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

const cubes = new Group();
const smokes = new Group();
for (let i = 0; i < 500; i++) {
    const cube = new Mesh(
        new BoxGeometry(.02, .02, .02),
        new MeshBasicMaterial({ color: "#fff", transparent: true })
    )
    cube.material.opacity = Math.random()
    cube.position.x = (Math.random() * 20) - 10
    cube.position.y = (Math.random() * 20) - 5
    cube.position.z = -1
    cubes.add(cube)
}
scene.add(cubes)

const earth = new Mesh(
    new SphereGeometry(1),
    new MeshPhongMaterial({ map: earthTexture, specular: "#000000" })
)

for (let i = 0; i < 50; i++) {
    const smoke = new Mesh(
        new PlaneGeometry(5, 5),
        new MeshLambertMaterial({
            map: smokeTexture,
            emissive: "#4561bf",
            transparent: true,
            opacity: .02,
        })
    );

    smoke.rotation.z = Math.random() * 5;
    smoke.position.y = (Math.random() * 2) * (Math.random() >= .5 ? 1 : -1)
    smoke.position.x = (Math.random() * 8) * (Math.random() >= .5 ? 1 : -1)

    smokes.add(smoke)
}
scene.add(smokes)
scene.add(earth)

camera.position.z = 5;

const animate = () => {
    requestAnimationFrame(animate);
    cubes.children.forEach(cube => {
        cube.rotation.z += .01;
        cube.rotation.x += .01;
    })

    smokes.children.forEach(smoke => {
        smoke.rotation.z += .001 * (Math.random() >= .5 ? 1 : -1);
    })
    earth.rotation.x += 0.0003;
    earth.rotation.z += 0.0003;
    renderer.render(scene, camera);
}
animate();

