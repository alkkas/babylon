import {
    Color3,
    Mesh,
    MeshBuilder, Nullable,
    Scene,
    StandardMaterial,
    Texture,
    Vector3, Vector4,
} from '@babylonjs/core'


class House {
    mesh: Nullable<Mesh>
    id: string

    static houses: House[] = []
    static scene: Scene

    constructor(scene: Scene, size: number = 2) {
        this.id = String(Math.random())
        if (!House.scene) {
            House.scene = scene
        }
        const roof = MeshBuilder.CreateCylinder('roof' + this.id, {
            diameter: 1.3,
            height: 1.2,
            tessellation: 3,
        })


        const roofMat = new StandardMaterial('roofMat' + this.id)
        roofMat.diffuseTexture = new Texture(
            'https://assets.babylonjs.com/environments/roof.jpg'
        )
        roof.material = roofMat
        roof.scaling.y = 2
        roof.scaling.z = 2
        roof.rotation.z = Math.PI / 2
        roof.position = new Vector3(0, 2.3, 0)

        const houseBaseMat = new StandardMaterial('houseMat' + this.id)
        houseBaseMat.diffuseTexture = new Texture(
            "https://assets.babylonjs.com/environments/cubehouse.png"
        )
        const faceUV = [new Vector4(0.5, 0.0, 0.75, 1.0), new Vector4(0.0, 0.0, 0.25, 1.0), new Vector4(0.25, 0, 0.5, 1.0), new Vector4(0.75, 0, 1.0, 1.0)]
        const houseBase = MeshBuilder.CreateBox('house' + this.id, {size, faceUV, wrap: true})
        houseBase.material = houseBaseMat
        houseBase.position = new Vector3(0, 1, 0)
        this.mesh = Mesh.MergeMeshes([houseBase, roof], true, false, undefined, false, true)
        if (!this.mesh) return
        this.mesh.scaling = new Vector3(0.3, 0.3, 0.3)
        House.houses.push(this)
    }

    addToScene() {
        House.scene.addMesh(this.mesh as Mesh)
    }

    position(x: number, y: number, z: number) {
        if (!this.mesh) return
        this.mesh.position = new Vector3(x, y, z)
    }
}

export default House
