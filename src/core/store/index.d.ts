export type State = { [key: string]: any };
export type Action = { type: string; payload?: any };
export type Reducer = (state: State, action: Action) => State;
