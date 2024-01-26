import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('p-card')
export class CardElement extends LitElement {
  @property({ type: String })
  title = '';

  protected render() {
    const header = this.title
      ? html`
          <div class="header">
            <h2 class="title">${this.title}</h2>
          </div>
        `
      : nothing;

    return html`
      <div class="card">
        ${header}
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    .card {
      margin-block-end: var(--size-4);
      padding-block: var(--size-4);
      padding-inline: var(--size-4);

      box-shadow: var(--shadow-3);
      border: 1px solid var(--gray-2);
      border-radius: var(--radius-3);

      transition: box-shadow 0.2s ease-out;
    }

    .card:hover {
      box-shadow: var(--shadow-4);
    }

    .title {
      margin-block-start: 0;
      margin-block-end: var(--size-2);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'p-card': CardElement;
  }
}
