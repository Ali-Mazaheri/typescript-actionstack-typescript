import {ActionStack, IAction} from "./ActionStack";

export enum ActionType{
  Add,
  Delete,
  Modify
}

export abstract class ActionBase implements IAction {
  protected itemId;
  
  public constructor(
    public actionType: ActionType,
    public newValue,
    public oldValue) { }

  public invoke(redo: boolean) {
    ActionStack.push(this, redo);
  };

  public revoke() {
    ActionStack.pop();
  };
}
