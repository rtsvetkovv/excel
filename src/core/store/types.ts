import { rootReducer } from 'store/rootReducer';
export type RootState = ReturnType<typeof rootReducer>;
export type Action = { type: string; payload?: any };
export type Reducer = (state: RootState, action: Action) => RootState;
