import { waitForInput } from "./Input";
import { AppState } from "./type";

export abstract class Command {
  constructor(public key: string, private desc: string) {
    //key : 입력받은 키
    //desc : 어떤 커맨드인지 설명
  }

  toString() {
    //화면에 해당 커맨드가 하는 일이 무엇인지 보여주기 위함
    return `${this.key}: ${this.desc}`;
  }

  abstract run(state: AppState): Promise<void>;
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
