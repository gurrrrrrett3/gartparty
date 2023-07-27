import "./style.css";
import * as three from "three";
import Logger from "./util/logger";
import Net from "./net/net";

// debug

(globalThis as any).DEBUG = true

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <canvas id="render"></canvas>
  <canvas id="ui"></canvas>  
`;

document.addEventListener("DOMContentLoaded", () => {});

export default class Main {
  public renderCanvas: HTMLCanvasElement;
  public uiCanvas: HTMLCanvasElement;
  public renderer: three.WebGLRenderer;
  public ui: CanvasRenderingContext2D;
  public scene: three.Scene;
  public camera: three.PerspectiveCamera;

  public net: Net;

  constructor() {
    this.renderCanvas = document.querySelector<HTMLCanvasElement>("#render")!;
    this.uiCanvas = document.querySelector<HTMLCanvasElement>("#ui")!;
    this.renderer = new three.WebGLRenderer({ canvas: this.renderCanvas });
    this.ui = this.uiCanvas.getContext("2d")!;
    this.scene = new three.Scene();
    this.camera = new three.PerspectiveCamera(
      75,
      this.renderCanvas.width / this.renderCanvas.height,
      0.1,
      1000
    );

    // network

    this.net = new Net();
  }

  public async init() {
    // main listeners

    document.addEventListener("DOMContentLoaded", this.resize.bind(this));
    document.addEventListener("resize", this.resize.bind(this));

    const geometry = new three.BoxGeometry();
    const material = new three.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new three.Mesh(geometry, material);
    this.scene.add(cube);

    this.camera.position.z = 5;

    this.animate();
  }

  public animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  public resize() {
    this.renderCanvas.width = window.innerWidth;
    this.renderCanvas.height = window.innerHeight;
    this.camera.aspect = this.renderCanvas.width / this.renderCanvas.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.renderCanvas.width, this.renderCanvas.height);

    this.uiCanvas.width = window.innerWidth;
    this.uiCanvas.height = window.innerHeight;

    Logger.info("Main", `Resized. New size: ${this.renderCanvas.width}x${this.renderCanvas.height}`);
  }
}

export const main = new Main();
main.init();
