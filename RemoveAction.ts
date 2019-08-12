import {ActionBase, ActionType} from "./ActionBase";
import {Model} from "./Model";

export class RemoveAction extends ActionBase {
  private deletedIndex;
  private value;
  public constructor(private collection: Model[], itemId) {
    super(ActionType.Delete, null, null);
    this.itemId = itemId;
    this.invoke(false);
  }

  public invoke(redo: boolean) {
    for(let i = 0; i<this.collection.length; i++){
      if(this.collection[i].id == this.itemId){
        this.deletedIndex = i;
        this.value = this.collection[i].value;
        break;
      }
    }

    if (this.deletedIndex != void(0)){
      this.collection.splice(this.deletedIndex, 1);
    }
    super.invoke(redo);
  }

  public revoke() {
    let item = new Model(this.itemId, this.value);
    this.collection.splice(this.deletedIndex, 0 , item);
    super.revoke();
  }
}
