import { waitForInput } from "./Input";
import { Action, ActionDeleteTodo, ActionNewTodo, AppState, PRIORITY_NAME_MAP, Priority } from "./type";
import { getIsValidEnumValue } from "./util";

export abstract class Command {
  constructor(public key: string, private desc: string) {
    //key : 입력받은 키
    //desc : 어떤 커맨드인지 설명
  }

  toString() {
    //화면에 해당 커맨드가 하는 일이 무엇인지 보여주기 위함
    return `${this.key}: ${this.desc}`;
  }

  abstract run(state: AppState): Promise<void | Action>;
}

export class CommandPrintTodos extends Command {
  constructor() {
    super("p", "모든 할 일 출력하기");
  }
  async run(state: AppState): Promise<void> {
    for (const todo of state.todos) {
      const text = todo.toString();
      console.log(text);
    }
    await waitForInput("press any key: ");
  }
}

export class CommandNewTodo extends Command {
  constructor() {
    super("n", "할 일 추가하기");
  }
  async run(): Promise<void | ActionNewTodo> {
    const title = await waitForInput("title: ");
    const priorityStr = await waitForInput(
      `priority ${PRIORITY_NAME_MAP[Priority.High]}(${Priority.High})~${PRIORITY_NAME_MAP[Priority.Low]}(${
        Priority.Low
      }): `
    );
    const priority = Number(priorityStr);
    if (title && CommandNewTodo.getIsPriority(priority)) {
      return {
        type: "newTodo",
        title,
        priority,
      };
    }
  }
  static getIsPriority(priority: number): priority is Priority {
    return getIsValidEnumValue(Priority, priority);
  }
}

export class CommandDeleteTodo extends Command {
  constructor() {
    super("d", "할 일 제거하기");
  }
  async run(state: AppState): Promise<void | ActionDeleteTodo> {
    for (const todo of state.todos) {
      const text = todo.toString();
      console.log(text);
    }

    const idStr = await waitForInput("press todo id to delete: ");
    const id = Number(idStr);

    return {
      type: "deleteTodo",
      id,
    };
  }
}
