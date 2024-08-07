import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Ref, createRef, ref } from 'lit/directives/ref.js';

import '@/components/p-envelope';
import '@/components/p-card';
import '@/components/form/p-field';
import '@/components/form/p-slider';

import '@/components/p-biquad-filter';
import { BiquadFilterElement } from '@/components/p-biquad-filter';
import { EnvelopeElement } from '@/components/p-envelope';
import { playTone } from '@/audio-utils/play-tone';

const notes: { [key: string]: number } = {
  C3: 130.81,
  'C#3': 138.59,
  D3: 146.83,
  'D#3': 155.56,
  E3: 164.81,
  F3: 174.61,
  'F#3': 185.0,
  G3: 196.0,
  'G#3': 207.65,
  A3: 220.0,
  'A#3': 233.08,
  B3: 246.94,
  C4: 261.63,
  'C#4': 277.18,
  D4: 293.66,
  'D#4': 311.13,
  E4: 329.63,
  F4: 349.23,
  'F#4': 369.99,
  G4: 392.0,
  'G#4': 415.3,
  A4: 440.0,
  'A#4': 466.16,
  B4: 493.88,
};
// The @customElement decorator is shorthand for calling customElements.define
@customElement('p-app')
export class App extends LitElement {
  @state()
  toneFrequency = notes.D4;

  @property({ type: String })
  lfoFrequency = '2';

  frequencyRef: Ref<HTMLSelectElement> = createRef();
  envelopeRef: Ref<EnvelopeElement> = createRef();
  biquadFilterRef: Ref<BiquadFilterElement> = createRef();

  onNodeChanged() {
    this.play();
  }

  play() {
    const envelopeEl = this.envelopeRef.value!;
    const biquadFilterEl = this.biquadFilterRef.value!;
    const frequencyEl = this.frequencyRef.value!;

    const { value: envelopeValues } = envelopeEl;
    const { value: biquadFilterValues } = biquadFilterEl;
    const { value: frequency } = frequencyEl;

    playTone(
      {
        lfoFrequency: Number(this.lfoFrequency),
        toneFrequency: Number(frequency),
      },
      biquadFilterValues,
      envelopeValues,
    );
  }

  protected render(): TemplateResult {
    return html`
      <div class="app">
        <div class="controls">
          <p-card title="Lowpass">
            <p-biquad-filter
              ${ref(this.biquadFilterRef)}
              @change="${this.play}"
            >
            </p-biquad-filter>
          </p-card>

          <p-card title="Envelope">
            <p-envelope ${ref(this.envelopeRef)} @change="${this.play}">
            </p-envelope>
          </p-card>

          <p-field>
            <label>Tone</label>
            <select
              ${ref(this.frequencyRef)}
              name="frequency"
              .value="${this.toneFrequency.toString()}"
              @change="${this.play}"
            >
              ${Object.keys(notes).map(
                (key) =>
                  html`<option
                    value="${notes[key]}"
                    ?selected="${notes[key] === this.toneFrequency}"
                  >
                    ${key}
                  </option>`,
              )}
            </select>
          </p-field>

          <p-field>
            <label for="lfo-frequency">LFO Frequency (wobble)</label>
            <input
              id="lfo-frequency"
              type="range"
              min="1"
              max="5"
              step="0.1"
              .value="${this.lfoFrequency}"
              @input="${(e: InputEvent) =>
                (this.lfoFrequency = (e.target as HTMLInputElement).value)}"
              @change="${this.play}"
            />
          </p-field>
        </div>

        <div class="main">
          <button class="generate" @click="${this.play}">Test</button>
        </div>
      </div>
    `;
  }

  static styles = css`
    .app {
      display: grid;
      gap: var(--gutter);
      grid-template-columns: repeat(8, 1fr);
    }

    .controls {
      grid-column: 1 / 3;
    }

    .main {
      grid-column: 3 / -1;
    }

    .generate {
      width: 100%;
      height: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'p-app': App;
  }
}
