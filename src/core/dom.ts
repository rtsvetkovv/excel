export type SelectorType = Element | string;
export type DomType = Dom;

class Dom {
  private $el: Element;

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

  html(html: SelectorType) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;

      return this;
    }

    return this.$el.outerHTML.trim();
  }

  clear(eventType: string, callback: EventListenerOrEventListenerObject) {
    this.html('');
    this.$el.removeEventListener(eventType, callback);
    return this;
  }

  append(node: Dom | Element) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    this.$el.append(node);

    return this;
  }

  on(eventType: string, callback: EventListenerOrEventListenerObject) {
    this.$el.addEventListener(eventType, callback);
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
