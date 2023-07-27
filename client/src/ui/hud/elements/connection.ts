import HudElement from "./base/hudElement";

export default class ConnectionHud extends HudElement {
  constructor() {
    super({
      id: "connection_status",
      scale: 1,
      type: "connection",
      x: 0,
      y: 0,
    });
  }

  public override render() {
    
  }
}
