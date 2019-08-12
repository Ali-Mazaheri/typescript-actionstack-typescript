
export interface IAction {
  invoke(redo: boolean);
  revoke();
}

class _ActionStack {
  private stack: IAction[] = [];
  private pointer = -1;

  public onActionStackChanged: (action: IAction) => void;

  private push(item: IAction, redo: boolean) {
    this.stack[++this.pointer] = item;
    if (!redo && this.pointer < this.stack.length - 1) {
      this.stack.splice(this.pointer + 1, this.stack.length - this.pointer + 1);
    }
    if (typeof this.onActionStackChanged == "function") {
      this.onActionStackChanged(item);
    }
  }

  private pop() {
    if (this.pointer > -1) {

      if (typeof this.onActionStackChanged == "function") {
        this.onActionStackChanged(this.getLastItem());
      }
      --this.pointer;
    }
  }

  public clearStack() {
    this.pointer = -1;
    this.stack.length = 0;
    if (typeof this.onActionStackChanged == "function") {
      this.onActionStackChanged(null);
    }
  }

  public redo() {
    if (this.pointer + 1 < this.stack.length) {
      this.getLastRedoItem().invoke(true);
    }
  }

  public undo() {
    if (this.pointer > -1) {
      this.getLastUndoItem().revoke();
    }
  }

  public getLastRedoItem() {
    return this.stack[this.pointer + 1];
  }

  public getLastUndoItem() {
    return this.stack[this.pointer];
  }

  public getLastItem() {
    return this.stack[this.pointer];
  }
}

let ActionStack = new _ActionStack();
export { ActionStack };