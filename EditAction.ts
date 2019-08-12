import {ActionBase, ActionType} from "./ActionBase";
import {Model} from "./Model";

export class EditAction extends ActionBase {
  private editedIndex;
  private value;
  public constructor(private collection: Model[], itemId, newValue) {
    super(ActionType.Modify, newValue, null);
    this.itemId = itemId;
    this.invoke(false);
  }

  public invoke(redo: boolean) {
    for(let i = 0; i<this.collection.length; i++){
      if(this.collection[i].id == this.itemId){
        this.editedIndex = i;
        this.value = this.collection[i].value;
        break;
      }
    }

    if (this.editedIndex != void(0)){
      this.oldValue = this.collection[this.editedIndex].value;
      this.collection[this.editedIndex].value = this.newValue;
    }
    super.invoke(redo);
  }

  public revoke() {
    this.collection[this.editedIndex].value = this.oldValue;
    super.revoke();
  }
}
