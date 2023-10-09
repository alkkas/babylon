import { Mesh, MeshBuilder, Vector3 } from '@babylonjs/core'

class Car {
  entity: Mesh
  constructor() {
    const outline = [new Vector3(-0.3, 0 - 0.1), new Vector3(0.2, 0, -0.1)]
    for (let i = 0; i < 20; i++) {
      outline.push(
        new Vector3(
          0.2 * Math.cos((i * Math.PI) / 40),
          0,
          0.2 * Math.sin((i * Math.PI) / 40) - 0.1
        )
      )
    }

    outline.push(new Vector3(0, 0, 0.1))
    outline.push(new Vector3(-0.3, 0, 0.1))

    this.entity = MeshBuilder.ExtrudePolygon('car', {
      shape: outline,
      depth: 0.2,
    })
    const wheelRB = MeshBuilder.CreateCylinder('wheelRB', {
      diameter: 0.125,
      height: 0.05,
    })
    wheelRB.parent = this.entity
    wheelRB.position.z = -0.1
    wheelRB.position.x = -0.2
    wheelRB.position.y = 0.035

    const wheelRF = wheelRB.clone('wheelRF')
    wheelRF.position.x = 0.1

    const wheelLB = wheelRB.clone('wheelLB')
    wheelLB.position.y = -0.2 - 0.035

    const wheelLF = wheelRF.clone('wheelLF')
    wheelLF.position.y = -0.2 - 0.035
  }
}
