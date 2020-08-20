export const rootReducer = (state: any, action: { type: string; payload?: any }) => {
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
