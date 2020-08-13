export class Store {
  private state: any;
  private listeners: Array<Function> = [];

  constructor(private rootReducer: any, initialState?: any) {
    this.state = rootReducer({ ...initialState }, { type: '__INIT__' });
  }

  public subscribe(fn: any) {
    this.listeners.push(fn);

    return {
      unsubscribe: this.unsubscribe.bind(this, fn),
    };
  }
  private unsubscribe(fn: Function) {
    this.listeners = this.listeners.filter((listener) => listener !== fn);
  }

  public dispatch(action: any) {
    this.state = this.rootReducer(this.state, action);
    this.listeners.forEach((listener) => listener(this.state));
  }

  getState() {
    return { ...this.state };
  }
}
// export function createStore(rootReducer: any, initialState?: any) {
//   let state = rootReducer({ ...initialState }, { type: '__INIT__' });
//   let listeners: Array<Function> = [];

//   return {
//     subscribe(fn: any) {
//       listeners.push(fn);

//       return {
//         unsubscribe() {
//           listeners = listeners.filter((listener) => listener !== fn);
//         },
//       };
//     },

//     dispatch(action: any) {
//       state = rootReducer(state, action);
//       listeners.forEach((listener) => listener(state));
//     },

//     getState() {
//       return { ...state };
//     },
//   };
// }
