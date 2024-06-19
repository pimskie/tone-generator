import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('p-step')
export class Step extends LitElement {
  @property({ type: Number })
  step = 0;

  @property({ type: String })
  tone = 'C3';

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean })
  isPointerDown = false;

  onPointerEnter() {
    if (!this.isPointerDown) {
      return;
    }

    this.toggleChecked();
  }

  toggleChecked() {
    this.checked = !this.checked;
  }

  render() {
    return html`${this.checked}
      <input
        type="checkbox"
        .checked="${this.checked}"
        @pointerdown="${(e: InputEvent) => this.toggleChecked}"
        @pointerenter="${this.onPointerEnter}"
        @change="${(e: InputEvent) =>
          (this.checked = (e.target as HTMLInputElement).checked)}"
      /> `;
  }

  static styles = css`
    input[type='checkbox'] {
      width: 100%;
      aspect-ratio: 1 /1;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'p-step': Step;
  }
}
