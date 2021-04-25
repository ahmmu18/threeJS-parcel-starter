import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'dat.gui'
import MODEL from './assets/sphere.gltf'

// dat GUI: to debug your Scene
// learn more at http://learningthreejs.com/blog/2011/08/14/dat-gui-simple-ui-for-demos/
const gui = new dat.GUI()

// Load 3D model
const loader = new GLTFLoader() 
loader.load(MODEL, function (gltf) {

    // define a meterial to apply to the meshes
    const objMaterial = new THREE.MeshNormalMaterial()

    // apply normal material to the meshes of the 3D model
    let meshesInTheModel = gltf.scene.children[0].children
        meshesInTheModel.map((oneMesh) => {
            oneMesh.material = objMaterial
            // enable double side geometry (uncomment when you see cuts in the imported 3D model)
            // oneMesh.material.side = THREE.DoubleSide
        })

    // add the 3D model to the scene
    scene.add(gltf.scene)
}, undefined, function (error) { console.error(error) })


// get the canvas from the index.html
// the canvas has a class of 
const canvas = document.querySelector('.myCanvas')


// setting the scene
// the scene is the stage needed for threeJS to render things on
// read more at https://threejs.org/docs/?q=sc#api/en/scenes/Scene
const scene = new THREE.Scene()


// light
const light = new THREE.AmbientLight(0x404040, 3) // soft white light
scene.add( light )


// handel the resizing of the browser window
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// listen to the browser resize and update the things that need to be updated,
// so everything looks perfect all the time
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// creating the camera
// camera is needed to show the things you render on the screen
// threeJS offers many types of camera (check the documentation)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2


// Controls
// These allow users to rotate (interact) the object
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true //enable smooth stop when the user stop the dragging
controls.autoRotate = true //auto rotate the 3D model
controls.autoRotateSpeed = 4 //rotation speed
controls.minPolarAngle = 1.5 //to restirict the user from orbiting up and down
controls.maxPolarAngle = 1.5 //to restirict the user from orbiting up and down
controls.enableZoom = false //to disable zoom


// add the things we created to the scene
// otherwise they won't be visible on the screen
// scene.add(myCube, camera)
scene.add(camera)

// creating the renderer
// the render is needed to render everything you created on the screen
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// you can change the render background color like this, 
// or by setting the transparent to true and customise the canvas bg color using css
renderer.setClearColor(new THREE.Color('#000'), 1)


// animate things

// this is a threeJS function that keeps track of time
// read more at https://threejs.org/docs/?q=clock#api/en/core/Clock
const clock = new THREE.Clock()

// 
const tick = () =>
{
    // get the seconds passed since the clock started
    // read more at https://threejs.org/docs/?q=clock#api/en/core/Clock.getElapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Update Orbital Controls
    // to enable the enableDamping for the controls
    controls.update()

    // updating the render at every frame
    renderer.render(scene, camera)

    // call the tick function on the next frame
    // requestAnimationFrame is a native JS function
    // read more at https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    window.requestAnimationFrame(tick)
}

// we run the tick function so the things get animated on the screen
tick()