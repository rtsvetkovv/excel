import { State, Action } from 'core/store';

export const rootReducer = (state: State, action: Action) => {
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
