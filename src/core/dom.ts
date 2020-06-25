class Dom {}

export function $() {
  return new Dom();
}
$.create = (tagName: keyof HTMLElementTagNameMap, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }

  return el;
};