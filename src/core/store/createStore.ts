import { State, Reducer, Action } from '.';

export class Store {
  private state: State;
  private listeners: Array<Function> = [];

  constructor(private rootReducer: Reducer, initialState?: State) {
    this.state = rootReducer({ ...initialState }, { type: '__INIT__' });
  }

  public subscribe(fn: Function) {
    this.listeners.push(fn);

    return {
      unsubscribe: this.unsubscribe.bind(this, fn),
    };
  }
  private unsubscribe(fn: Function) {
    this.listeners = this.listeners.filter((listener) => listener !== fn);
  }

  public dispatch(action: Action) {
    this.state = this.rootReducer(this.state, action);
    this.listeners.forEach((listener) => listener(this.state));
  }

  getState() {
    return { ...this.state };
  }
}
