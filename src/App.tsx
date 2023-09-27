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
import {Scene} from '@babylonjs/core/scene'
import {Mesh} from '@babylonjs/core/Meshes'
import './App.css'
import SceneComponent from 'babylonjs-hook'
import House from './3d/createHouse'
import {useEffect} from "react";

function App() {

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
            {width: 6, height: 6},
            scene
        )
        ground.material = groundMaterial

        init(scene)
    }

    const init = (scene: Scene) => {
        const standaloneHouse = new House(scene)
        const houses = []
        if (!standaloneHouse.mesh) return
        for (let i = 1; i < 9; i++) {
            houses[i] = standaloneHouse.mesh.createInstance('house' + i)
            houses[i].position.x = Math.sin(i * 180 / Math.PI) * 2.5
            houses[i].position.z = Math.cos(i * 180 / Math.PI) * 2.5
        }
        console.log(House.houses)
    }
    useEffect(() => {
        return () => {
            House.houses = []
        }
    }, [])
    return (
        <div className="App">
            <SceneComponent onSceneReady={onSceneReady} antialias id="mainScene"/>
        </div>
    )
}

export default App
