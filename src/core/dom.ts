export type SelectorType = Element | string;
export type DomType = Dom;

class Dom {
  private $el: Element | HTMLElement;

  constructor(selector: SelectorType) {
    if (typeof selector === 'string') {
      const element = document.querySelector(selector);

      if (element) {
        this.$el = element;
      } else {
        throw new Error(`Element by selector "${selector}" is not founded`);
      }
    } else {
      this.$el = selector;
    }
  }

  get element() {
    return this.$el;
  }

  html(html: SelectorType) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;

      return this;
    }

    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  append(node: Dom | Element) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    this.$el.append(node);

    return this;
  }

  closest(selector: string) {
    const $closest = this.$el.closest(selector);
    if (!$closest) return null;

    return $($closest);
  }

  getCoordinates() {
    return this.$el.getBoundingClientRect();
  }

  find(selector: string) {
    const element = this.$el.querySelector(selector);
    if (!element) return null;

    return $(element);
  }

  findAll(selector: string) {
    return this.$el.querySelectorAll(selector);
  }

  addClass(className: string) {
    this.$el.classList.add(className);
  }

  removeClass(className: string) {
    this.$el.classList.remove(className);
  }

  get data() {
    if (!(this.$el instanceof HTMLElement)) return;

    return this.$el.dataset;
  }

  css(styles: { [key: string]: string | number }) {
    if (!(this.$el instanceof HTMLElement)) return;

    Object.assign(this.$el.style, styles);
  }

  on(eventType: string, callback: EventListenerOrEventListenerObject) {
    this.$el.addEventListener(eventType, callback);
  }

  of(eventType: string, callback: EventListenerOrEventListenerObject) {
    this.$el.removeEventListener(eventType, callback);
  }
}

export function $(selector: SelectorType) {
  return new Dom(selector);
}

$.create = (tagName: keyof HTMLElementTagNameMap, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};
