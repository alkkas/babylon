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
  }
}
