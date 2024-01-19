import { LitElement, html } from 'lit';

import '@/components/form/p-field';
import '@/components/form/p-slider';
import { SliderElement } from '@/components/form/p-slider';
import { customElement, state } from 'lit/decorators.js';

type BiquadFilter = {
  frequency: number;
  Q: number;
  detune: number;
};

export { type BiquadFilter };

@customElement('p-biquad-filter')
export class BiquadFilterElement extends LitElement {
  @state()
  value: BiquadFilter = {
    frequency: 350,
    Q: 1,
    detune: 0,
  };

  render() {
    return html`
      <p-field>
        <p-slider
          id="lowpass-frequency"
          name="frequency"
          .value="${this.value.frequency}"
          min="50"
          max="1000"
          @change="${this.onChange}"
        >
        </p-slider>
      </p-field>

      <p-field>
        <p-slider
          id="lowpass-Q"
          name="Q"
          .value="${this.value.Q}"
          min="0"
          max="20"
          @change="${this.onChange}"
        >
        </p-slider>
      </p-field>

      <p-field>
        <p-slider
          id="lowpass-detune"
          name="detune"
          .value="${this.value.detune}"
          min="0"
          max="100"
          @change="${this.onChange}"
        >
        </p-slider>
      </p-field>
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
    'p-biquad-filter': BiquadFilterElement;
  }
}
