import { main } from "../../../../main";
import Logger from "../../../../util/logger";
import HudManager from "../../hudManager";

export default class HudElement {
  public type: string;
  public id: string;
  public x: number;
  public y: number;
  public scale: number;
  public baseWidth: number
  public baseHeight: number
  public needsUpdate: boolean = true;
  public visible: boolean = true;
  public updateEveryFrame: boolean = false;
  public showBoudingBox: boolean = false;

  constructor(options: { type: string; id: string; x: number; y: number; scale: number, baseWidth: number, baseHeight: number }) {
    this.type = options.type;
    this.id = options.id;
    this.x = options.x;
    this.y = options.y;
    this.scale = options.scale;
    this.baseWidth = options.baseWidth
    this.baseHeight = options.baseHeight
  }

  public render() {
    Logger.error("HudElement", "render() not implemented");
  }

  public enableUpdate() {
    this.needsUpdate = true;
  }

  public alwaysUpdate() {
    this.updateEveryFrame = true;
  }

  /**
   * @internal
   * This method is called by the HudManager to render the elem ent
   * Don't call this method directly or override it
   */
  public _runRender() {
    if (this.needsUpdate || this.updateEveryFrame) {

      main.ui.clearRect(this.x, this.y, this.baseWidth * this.scale, this.baseHeight * this.scale)

      this.render();
      this.needsUpdate = false;
    }

    if (this.showBoudingBox) {
      main.ui.strokeStyle = "#ff0000";
      main.ui.strokeRect(this.x, this.y, this.baseWidth * this.scale, this.baseHeight * this.scale);
    }
  }

  public destroy() {
    HudManager.instance.removeElement(this);
  }

  public hide() {
    this.visible = false;
  }

  public show() {
    this.visible = true;
  }

  public toggle() {
    this.visible = !this.visible;
  }

  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.enableUpdate();
  }

  public setScale(scale: number) {
    this.scale = scale;
    this.enableUpdate();
  }

  public setX(x: number) {
    this.x = x;
    this.enableUpdate();
  }

  public setY(y: number) {
    this.y = y;
    this.enableUpdate();
  }
}
