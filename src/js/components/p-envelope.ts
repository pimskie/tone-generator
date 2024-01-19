import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { SliderElement } from '@/components/form/p-slider';

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
  @state()
  value: Envelope = {
    attack: 0.1,
    decay: 0.1,
    sustain: 0.1,
    release: 0.2,
    duration: 0.5,
  };

  render() {
    return html`
      <div>
        <p-field>
          <p-slider
            id="envelope-attack"
            name="attack"
            .value="${this.value.attack}"
            min="0"
            max="3"
            step="0.1"
            @change="${this.onChange}"
          >
          </p-slider>
        </p-field>

        <p-field>
          <p-slider
            id="envelope-decay"
            name="decay"
            .value="${this.value.decay}"
            min="0"
            max="3"
            step="0.1"
            @change="${this.onChange}"
          >
          </p-slider>
        </p-field>

        <p-field>
          <p-slider
            id="envelope-sustain"
            name="sustain"
            .value="${this.value.sustain}"
            min="0"
            max="3"
            step="0.1"
            @change="${this.onChange}"
          >
          </p-slider>
        </p-field>

        <p-field>
          <p-slider
            id="envelope-release"
            name="release"
            .value="${this.value.release}"
            min="0"
            max="3"
            step="0.1"
            @change="${this.onChange}"
          >
          </p-slider>
        </p-field>

        ${this.value.duration}s
      </div>
    `;
  }

  onChange(e: InputEvent) {
    const slider = e.target as SliderElement;
    const { name, value } = slider;

    this.value = {
      ...this.value,
      [name]: value,
    };

    this.value.duration = Number(
      (
        this.value.attack +
        this.value.decay +
        this.value.sustain +
        this.value.release
      ).toFixed(1),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'p-envelope': EnvelopeElement;
  }
}
