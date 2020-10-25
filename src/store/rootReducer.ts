import { Action } from 'core/store';
type State = { [key: string]: any };

const initialState = {
  tableTitle: '',
  colState: {},
};

export const rootReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'TABLE_RESIZE':
      return {
        ...state,
        colState: {
          ...state?.colState,
          [action.payload.id]: action.payload.value,
        },
      };

    default:
      return state;
  }
};
