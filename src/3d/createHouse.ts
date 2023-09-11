import {
  Color3,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from '@babylonjs/core'

const createHouse = (scene: Scene): void => {
  const roofMat = new StandardMaterial('roofMat', scene)
  roofMat.diffuseTexture = new Texture(
    'https://assets.babylonjs.com/environments/roof.jpg',
    scene
  )

  const houseMat = new StandardMaterial('houseMat')
  houseMat.diffuseTexture = new Texture(
    'https://www.babylonjs-playground.com/textures/floor.png',
    scene
  )

  const house = MeshBuilder.CreateBox('house', { size: 2 }, scene)
  house.material = houseMat
  house.position = new Vector3(0, 1, 0)
  house.rotation.y = Math.PI / 4
  const roof = MeshBuilder.CreateCylinder(
    'roof',
    { diameter: 1.3, height: 1.2, tessellation: 3 },
    scene
  )
  roof.material = roofMat
  roof.scaling.y = 2
  roof.scaling.z = 2
  roof.rotation.z = Math.PI / 2
  roof.rotation.y = Math.PI / 4
  roof.position = new Vector3(-0.1, 2.5, -0.5)
}
export default createHouse
