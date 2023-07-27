import HudElement from "./elements/base/hudElement";

export default class HudManager {

    private static _instance: HudManager;
    public static get instance(): HudManager {
        if (!HudManager._instance) HudManager._instance = new HudManager();
        return HudManager._instance;
    }

    private _elements: HudElement[] = [];

    public addElement(element: HudElement) {
        this._elements.push(element);
    }

    public removeElement(element: HudElement | string) {
        const index = element instanceof HudElement ? this._elements.indexOf(element) : this._elements.findIndex((e) => e.id === element);
        if (index > -1) this._elements.splice(index, 1);
    }

    public render() {
        this._elements.forEach((element) => element._runRender());
    }

    public destroy() {
        this._elements.forEach((element) => element.destroy());
    }


}