import { Action } from 'core/store';
type State = { [key: string]: any };

const initialState = {
  tableTitle: '',
  colState: {},
};

export const rootReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'TABLE_RESIZE':
      const field = action.payload.type === 'row' ? 'rowState' : 'colState';

      return {
        ...state,
        [field]: {
          ...state?.[field],
          [action.payload.id]: action.payload.value,
        },
      };

    default:
      return state;
  }
};
