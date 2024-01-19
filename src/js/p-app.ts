import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Ref, createRef, ref } from 'lit/directives/ref.js';

import '@/components/form/p-field';
import '@/components/p-envelope';
import '@/components/form/p-slider';

import '@/components/p-biquad-filter';
import { BiquadFilterElement } from '@/components/p-biquad-filter';

import { EnvelopeElement } from '@/components/p-envelope';

import { playTone } from '@/audio-utils/play-tone';

// The @customElement decorator is shorthand for calling customElements.define
@customElement('p-app')
export class App extends LitElement {
  @property({ type: String })
  toneFrequency = '100';

  @property({ type: String })
  lfoFrequency = '2';

  envelopeRef: Ref<EnvelopeElement> = createRef();
  biquadFilterRef: Ref<BiquadFilterElement> = createRef();

  onNodeChanged() {
    this.play();
  }

  play() {
    const envelopeEl = this.envelopeRef.value!;
    const biquadFilterEl = this.biquadFilterRef.value!;

    const { value: envelopeValues } = envelopeEl;
    const { value: biquadFilterValues } = biquadFilterEl;

    playTone(
      {
        lfoFrequency: Number(this.lfoFrequency),
        toneFrequency: Number(this.toneFrequency),
      },
      biquadFilterValues,
      envelopeValues,
    );
  }

  protected render(): TemplateResult {
    return html`
      <div class="app">
        <div class="controls">
          <p-biquad-filter
            ${ref(this.biquadFilterRef)}
            @change="${this.onNodeChanged}"
          >
          </p-biquad-filter>

          <p-envelope ${ref(this.envelopeRef)} @change="${this.onNodeChanged}">
          </p-envelope>

          <p-field>
            <label for="tone-frequency">Tone Frequency</label>
            <input
              id="tone-frequency"
              type="range"
              min="50"
              max="500"
              step="1"
              .value="${this.toneFrequency}"
              @input="${(e: InputEvent) =>
                (this.toneFrequency = (e.target as HTMLInputElement).value)}"
              @change="${this.play}"
            />
          </p-field>

          <p-field>
            <label for="lfo-frequency">LFO Frequency (wobble)</label>
            <input
              id="lfo-frequency"
              type="range"
              min="1"
              max="20"
              step="0.5"
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
