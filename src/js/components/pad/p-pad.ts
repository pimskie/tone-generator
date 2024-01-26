import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { notes as _notes } from '@/config/notes';

import '@/components/pad/p-step';

@customElement('p-pad')
export class Pad extends LitElement {
  @state()
  protected steps = 16;

  @state()
  protected notes = _notes;

  @state()
  protected isPointerDown = false;

  constructor() {
    super();

    document.body.addEventListener(
      'pointerdown',
      (e) => (this.isPointerDown = true),
    );
    document.body.addEventListener(
      'pointerup',
      (e) => (this.isPointerDown = false),
    );
  }

  render() {
    const stepsList = new Array(this.steps)
      .fill(this.steps)
      .map((_, i) => i + 1);

    const notesList = Object.keys(this.notes);

    return html`
      <div class="pad">
        ${this.isPointerDown}
        ${notesList.map(
          (note) => html`
            <div class="note" data-note="${note}">
              <div class="note__label">${note}</div>
              ${stepsList.map(
                (step) => html`
                  <p-step
                    class="step"
                    checked
                    step="${step}"
                    .isPointerDown="${this.isPointerDown}"
                    >${step}</p-step
                  >
                `,
              )}
            </div>
          `,
        )}
      </div>
    `;
  }

  static styles = css`
    .note {
      display: grid;

      /* TODO: base on steps property */
      grid-template-columns: repeat(17, 1fr);
    }

    .note > div {
      padding-block: var(--size-3);
      padding-inline: var(--size-3);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'p-pad': Pad;
  }
}
