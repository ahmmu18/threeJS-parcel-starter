# ThreeJS Starter Template
ThreeJS starter template using ParcelJS

## How to use
- Clone the repo 
- Run `npm i` to install the required node packages
- Run `npm run dev` to run the project in dev mode
- ParcelJS runs the project on port `1234` http://localhost:1234

## Things to know
- I've tried my best to explain every code block written in `JS` files using comments. Please read the comments if you want to understand what each block does
- There are **two** `JS` files (*will add more by time*), each acts as a template
  - The `app.js` is a basic starter template that has the most basic things to run ThreeJS
  - The `load-3d-model.js` is a bit more advanced, it loads a 3D model, applies materials, and implement controls to allow user interactions
- Both `JS` files are linked to `index.html` and all you have to do is comment/uncomment the one you're willing to use
- The **assets** directory (*inside src*) is where to place your assets, that includes the 3D models you're willing to use
- To make importing 3D models easier, use `gltf` or `glb` formats, those formats have everything bundled in one file
- I've included a `sphere.gltf` inside, this is a model I created, feel free to use it anyway you want (*don't worry about the license*)
