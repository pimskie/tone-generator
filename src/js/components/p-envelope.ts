import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Envelope = {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  duration: number;
};

export type { Envelope };

@customElement('p-envelope')
export class EnvelopeElement extends LitElement {
  @property({ type: Number })
  attack = 0;

  @property({ type: Number })
  decay = 0;

  @property({ type: Number })
  sustain = 0;

  @property({ type: Number })
  release = 0;

  public get duration() {
    return Number(
      (this.attack + this.decay + this.sustain + this.release).toFixed(1),
    );
  }

  render() {
    return html`
      <div>
        <p-field>
          <label for="attack">Attack</label>
          <input
            id="attack"
            type="range"
            min="0"
            max="1"
            step="0.1"
            .value=${this.attack.toString()}
            @input="${(e: InputEvent) =>
              (this.attack = (e.target as HTMLInputElement).valueAsNumber)}"
          />
          ${this.attack}
        </p-field>

        <p-field>
          <label for="decay">decay</label>
          <input
            id="decay"
            type="range"
            min="0"
            max="1"
            step="0.1"
            .value=${this.decay.toString()}
            @input="${(e: InputEvent) =>
              (this.decay = (e.target as HTMLInputElement).valueAsNumber)}"
          />
          ${this.decay}
        </p-field>

        <p-field>
          <label for="sustain">sustain</label>
          <input
            id="sustain"
            type="range"
            min="0"
            max="1"
            step="0.1"
            .value=${this.sustain.toString()}
            @input="${(e: InputEvent) =>
              (this.sustain = (e.target as HTMLInputElement).valueAsNumber)}"
          />
          ${this.sustain}
        </p-field>

        <p-field>
          <label for="release">release</label>
          <input
            id="release"
            type="range"
            min="0"
            max="1"
            step="0.1"
            .value=${this.release.toString()}
            @input="${(e: InputEvent) =>
              (this.release = (e.target as HTMLInputElement).valueAsNumber)}"
          />
          ${this.release}
        </p-field>

        ${this.duration}s
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'p-envelope': EnvelopeElement;
  }
}
