import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `tm-aspect-div`
 * Polymer web component container that maintains an aspect ratio.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TmAspectDiv extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'tm-aspect-div',
      },
    };
  }
}

window.customElements.define('tm-aspect-div', TmAspectDiv);
