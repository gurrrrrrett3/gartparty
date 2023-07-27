import HudManager from "../hudManager";
import HudElement from "./base/hudElement";

export default class ConnectionHud extends HudElement {
  constructor() {
    super({
      id: "connection_status",
      scale: 1,
      type: "connection",
      x: 0,
      y: 0,
      baseWidth: 100,
      baseHeight: 100
    });
    HudManager.instance.addElement(this)
    this.hide()
  }

  public override render() {
    
  }
}
