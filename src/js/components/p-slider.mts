import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// The @customElement decorator is shorthand for calling customElements.define
@customElement('p-slider')
export class Slider extends LitElement {
  @property({ type: Number })
  min: number = 0;

  @property({ type: Number })
  max: number = 1;

  @property({ type: Number })
  step: number = 0.1;

  protected render(): TemplateResult {
    return html` <input type="range" /> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'p-slider': Slider;
  }
}
