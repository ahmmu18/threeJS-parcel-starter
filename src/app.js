import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'

// dat GUI: to debug your Scene
// learn more at http://learningthreejs.com/blog/2011/08/14/dat-gui-simple-ui-for-demos/
const gui = new dat.GUI()


// get the canvas from the index.html
// the canvas has a class of 
const canvas = document.querySelector('.myCanvas')


// setting the scene
// the scene is the stage needed for threeJS to render things on
// read more at https://threejs.org/docs/?q=sc#api/en/scenes/Scene
const scene = new THREE.Scene()


// creating an object
// in this case we are creating cube
// threeJS offers many basic geomatries, like box, sphere, and ring
const geometry = new THREE.BoxGeometry()


// creating material
// metrial is the skin that gives the object its appearance
// threeJS offers many types of materials
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })


// creating the mesh
// mesh is made of the object and the material, and it's the thing that we gonna rendere on the screen
const myCube = new THREE.Mesh(geometry, material)


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


// add the things we created to the scene
// otherwise they won't be visible on the screen
scene.add(myCube, camera)

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

    // rotate the cube
    myCube.rotation.y = .5 * elapsedTime

    // updating the render at every frame
    renderer.render(scene, camera)

    // call the tick function on the next frame
    // requestAnimationFrame is a native JS function
    // read more at https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    window.requestAnimationFrame(tick)
}

// we run the tick function so the things get animated on the screen
tick()