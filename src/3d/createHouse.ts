import {
  Color3,
  Mesh,
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

class House {
  houseBase: Mesh
  roof: Mesh
  id: string

  static houses: House[] = []

  constructor(size: number = 2) {
    const houseId = String(Math.random())
    this.id = houseId
    this.houseBase = MeshBuilder.CreateBox('house' + this.id, { size })
    this.roof = MeshBuilder.CreateCylinder('roof' + this.id, {
      diameter: 1.3,
      height: 1.2,
      tessellation: 3,
    })
    House.houses.push(this)

    const roofMat = new StandardMaterial('roofMat' + this.id)
    roofMat.diffuseTexture = new Texture(
      'https://assets.babylonjs.com/environments/roof.jpg'
    )
    this.roof.material = roofMat
    this.roof.scaling.y = 2
    this.roof.scaling.z = 2
    this.roof.rotation.z = Math.PI / 2
    this.roof.rotation.y = Math.PI / 4
    this.roof.position = new Vector3(0, 2.3, 0)

    const houseBaseMat = new StandardMaterial('houseMat' + this.id)
    houseBaseMat.diffuseTexture = new Texture(
      'https://www.babylonjs-playground.com/textures/floor.png'
    )
    this.houseBase.material = houseBaseMat
    this.houseBase.position = new Vector3(0, 1, 0)
    this.houseBase.rotation.y = Math.PI / 4
  }

  addToScene(scene: Scene) {
    scene.addMesh(this.houseBase)
    scene.addMesh(this.roof)
  }
  position(x: number, y: number, z: number) {
    this.houseBase.position = new Vector3(x, y, z)
    this.roof.position = new Vector3(x, y + 1.3, z)
  }
}

export default House
