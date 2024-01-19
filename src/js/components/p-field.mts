import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('p-field')
class Field extends LitElement {
  render() {
    return html`
      <div class="field">
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    .field {
      margin-block-start: var(--size-2);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'p-field': Field;
  }
}
