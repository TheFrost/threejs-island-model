import * as THREE from 'three';

// subjects
import IslandSubject from './sceneSubjects/IslandSubject'
import GeneralLights from './sceneSubjects/GeneralLights';
import RotateObject from './sceneSubjects/RotateObject';

export default class SceneManager {

  clock = new THREE.Clock();
  
  buildScene = () => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#DAACC6');

    return scene;
  }

  buildRender = ({ width, height }) => {
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true,
      alpha: true
    });
    const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    return renderer;
  }

  buildCamera = ({ width, height }, scene) => {
    const aspectRatio = width / height;
    const fieldOfView = 60;
    const nearPlane = 1;
    const farPlane = 1000;
    const camera = new THREE.PerspectiveCamera(
      fieldOfView, 
      aspectRatio, 
      nearPlane, 
      farPlane
    );
    camera.position.set(0, 50, 200);
    camera.lookAt(scene.position);

    return camera;
  }

  createSceneSubjects = scene => {
    const sceneSubjects = [
      // subjects
      new IslandSubject(scene),
      new GeneralLights(scene),
      new RotateObject(scene)
    ];

    return sceneSubjects;
  }

  constructor(canvas) {
    this.canvas = canvas;
    this.screenDimentions = {
      width: this.canvas.width,
      height: this.canvas.height
    }
  
    this.scene = this.buildScene();
    this.renderer = this.buildRender(this.screenDimentions);
    this.camera = this.buildCamera(this.screenDimentions, this.scene);
    this.sceneSubjects = this.createSceneSubjects(this.scene);
  }

  update() {
    const elapsedTime = this.clock.getElapsedTime();

    this.sceneSubjects.map(s => s.update ? s.update(elapsedTime) : null);

    this.renderer.render(
      this.scene, 
      this.camera
    );
  }

  resizeHandler() {
    const { width, height } = this.canvas;

    this.screenDimentions = { width, height };

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

}