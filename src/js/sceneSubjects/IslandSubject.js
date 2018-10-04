import * as THREE from 'three';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';

export default class IslandSubject {
  mtlLoader = new MTLLoader();
  objLoader = new OBJLoader();

  isModelReady = false;

  constructor(scene) {
    
    this.mtlLoader.load('resources/low-poly-mill.mtl', materials => {
      materials.preload();

      this.objLoader
        .setMaterials(materials)
        .load('resources/low-poly-mill.obj', object => {
          object.rotation.y = Math.PI / 2;
          object.position.y = -30;
          object.traverse(child => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              
              if (child.material instanceof Array) {
                child.material.map(material => {
                  material.reflectivity = 0;
                  material.shininess = 0;
                  material.flatShading = true;
                });
              } else {
                child.material.reflectivity = 0;
                child.material.shininess = 0;
                child.material.flatShading = true;
              }
            }
          });

          scene.add(object);

          this.island = object;
          this.isModelReady = true;
        });
    });

  }

  update(time) {
    if (!this.isModelReady) return;

    // this.island.rotation.y += 0.001;
  }
}