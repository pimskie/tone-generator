import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SliderElement } from '@/components/form/p-slider';

type Envelope = {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
};

export type { Envelope };

@customElement('p-envelope')
export class EnvelopeElement extends LitElement {
  @property({ type: Object })
  value: Envelope = {
    attack: 0.0,
    decay: 0.0,
    sustain: 0.1,
    release: 0.2,
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
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'p-envelope': EnvelopeElement;
  }
}
