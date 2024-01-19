import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// The @customElement decorator is shorthand for calling customElements.define
@customElement('p-slider')
export class SliderElement extends LitElement {
  @property({ type: Number })
  min: number = 0;

  @property({ type: Number })
  max: number = 1;

  @property({ type: Number })
  step: number = 0.1;

  @property({ type: Number })
  value: number = 0;

  @property({ type: String })
  id = '';

  @property({ type: String })
  name = '';

  protected render(): TemplateResult {
    return html`
      <label for="${this.id}">${this.name}</label>
      <input
        type="range"
        id="${this.id}"
        name="${this.name}"
        min="${this.min}"
        max="${this.max}"
        step="${this.step}"
        value="${this.value}"
        @input="${(e: InputEvent) =>
          (this.value = (e.target as HTMLInputElement).valueAsNumber)}"
        @change=${this.onChange}
      />
      ${this.value}
    `;
  }

  onChange() {
    const event = new Event('change', { bubbles: true, composed: true });

    this.dispatchEvent(event);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'p-slider': SliderElement;
  }
}
