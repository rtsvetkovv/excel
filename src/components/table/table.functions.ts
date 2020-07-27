export const shouldResize = (event: MouseEvent) => {
  return event.target instanceof HTMLElement && event.target.dataset.resize;
};
