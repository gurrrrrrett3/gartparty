import { main } from "../../../main";
import HudManager from "../hudManager";
import HudElement from "./base/hudElement";

export default class FpsHud extends HudElement {
  constructor() {
    super({
      id: "fps_hud",
      type: "fps",
      x: 0,
      y: 100,
      baseWidth: 0,
      baseHeight: 50,
      scale: 1,
    });

    HudManager.instance.addElement(this)
    this.alwaysUpdate()
    this.showBoudingBox = true
  }

  public override render(): void {
    main.ui.fillStyle = "#ffffff"
    main.ui.font = `${Math.round((this.baseHeight - 10) * this.scale)}px monospace`;
    this.baseWidth = main.ui.measureText(`${main.fps.toFixed(2)} fps`).width;
    main.ui.fillText(`${main.fps.toFixed(2)} fps`, this.x, this.y + (this.baseHeight - 10) * this.scale);
    this.enableUpdate()
  }
}
