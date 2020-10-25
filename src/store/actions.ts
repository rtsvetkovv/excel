import { TABLE_RESIZE } from './constants';

export const tableResize = (data: object) => {
  return {
    type: TABLE_RESIZE,
    payload: data,
  };
};
