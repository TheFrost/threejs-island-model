import * as THREE from 'three';

export default class GeneralLights {

  constructor(scene) {
    const ambient = new THREE.AmbientLight('#fff', 0.5);
    scene.add(ambient);

    const directional = new THREE.DirectionalLight('#fff', 0.5);
    directional.position.set(10, 0, 100);
    directional.castShadow = true;
    scene.add(directional);
  }
  
}