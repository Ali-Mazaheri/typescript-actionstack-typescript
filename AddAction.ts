import {ActionBase, ActionType} from "./ActionBase";
import {Model} from "./Model";

export class AddAction extends ActionBase {
  public constructor(private collection: Model[], newValue) {
    super(ActionType.Add, newValue, null);
    this.invoke(false);
  }

  public invoke(redo: boolean) {
    let id = Math.random();
    this.itemId = id;
    let c = new Model(id, this.newValue);
    this.collection.push(c);
    super.invoke(redo);
  }

  public revoke() {
    this.collection.pop();
    super.revoke();
  }
}
