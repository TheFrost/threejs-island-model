import * as THREE from 'three';

export default class IslandSubject {
  constructor(scene) {
    
    const mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(20, 1),
      new THREE.MeshStandardMaterial({flatShading: true})
    );
    mesh.position.y = 120;
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    this.object = new THREE.Object3D();
    this.object.add(mesh)
    
    scene.add(this.object);
  }

  update(time) {
    this.object.rotation.z += 0.01;
  }
}