import { ActionStack, IAction } from "./ActionStack";
import { AddAction } from "./AddAction";
import { RemoveAction } from "./RemoveAction";
import { EditAction } from "./EditAction";
import { Model } from "./Model";


export class Application {
  private container: HTMLElement = document.getElementById('container');
  private add: HTMLElement = document.getElementById('add');
  private undo: HTMLElement = document.getElementById('undo');
  private redo: HTMLElement = document.getElementById('redo');
  private clearStack: HTMLElement = document.getElementById('clearStack');
  private list: Model[] = [];

  public constructor() {
    ActionStack.onActionStackChanged = (action) => {
      this.render();
    };

    this.add.onclick = (e) => {
      new AddAction(this.list, "Editable Item " + (10000 * Math.random()).toFixed(0));
    };

    this.undo.onclick = (e) => {
      ActionStack.undo();
    };

    this.redo.onclick = (e) => {
      ActionStack.redo();
    };

    this.clearStack.onclick = (e) =>
    {
      this.list.length = 0;
      ActionStack.clearStack();
    }
  }

  private removeItem(id, e: MouseEvent) {
    new RemoveAction(this.list, id);
  }

  private editItem(id, newValue, e:MouseEvent){
    new EditAction(this.list, id, (e.target as HTMLInputElement).value);
  }

  private render() {
    this.container.innerHTML = "";
    this.list.forEach((item) => {
      let em = document.createElement("div");
      em.className = "item";

      let ti = document.createElement("input");
      ti.value = item.value;
      ti.onchange = this.editItem.bind(this, item.id, ti.value);

      let ti2 = document.createElement("span");
      ti2.innerText = "Remove";
      ti2.className = "btn";
      ti2.onclick = this.removeItem.bind(this, item.id);

      em.appendChild(ti);
      em.appendChild(ti2);
      this.container.appendChild(em);
    });

  }
}
