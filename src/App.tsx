import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Color3,
  ArcRotateCamera,
} from '@babylonjs/core'
import BABYLON from '@babylonjs/core'
import { Scene } from '@babylonjs/core/scene'
import { Mesh } from '@babylonjs/core/Meshes'
import './App.css'
import SceneComponent from 'babylonjs-hook'
import House from './3d/createHouse'

function App() {
  let box: Mesh | undefined = undefined

  const onSceneReady = (scene: Scene) => {
    // This creates and positions a free camera (non-mesh)
    const camera = new ArcRotateCamera(
      'Camera',
      0,
      0,
      10,
      new Vector3(0, 0, 0),
      scene
    )

    // This targets the camera to scene origin
    camera.setPosition(new Vector3(0, 0, 20))

    const canvas = scene.getEngine().getRenderingCanvas()
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true)

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.8
    // Our built-in 'ground' shape.
    const groundMaterial = new StandardMaterial('groundMaterial', scene)
    groundMaterial.diffuseColor = new Color3(0, 1, 0)
    const ground = MeshBuilder.CreateGround(
      'ground',
      { width: 6, height: 6 },
      scene
    )
    ground.material = groundMaterial

    init(scene)
  }

  const init = (scene: Scene) => {
    const house = new House()
    const house2 = new House()
    house.addToScene(scene)
    house2.addToScene(scene)
    house.position(2, 1, 2)
  }

  return (
    <div className="App">
      <SceneComponent onSceneReady={onSceneReady} antialias id="mainScene" />
    </div>
  )
}

export default App
