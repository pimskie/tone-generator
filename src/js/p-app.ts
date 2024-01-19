import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Ref, createRef, ref } from 'lit/directives/ref.js';

import '@/components/p-field';
import '@/components/p-envelope';
import { EnvelopeElement } from '@/components/p-envelope';

import { playTone } from '@/audio-utils/play-tone';

// The @customElement decorator is shorthand for calling customElements.define
@customElement('p-app')
export class App extends LitElement {
  @property({ type: String })
  toneFrequency = '100';

  @property({ type: String })
  lfoFrequency = '2';

  @property({ type: String })
  lowpassFrequency = '800';

  envelopeRef: Ref<EnvelopeElement> = createRef();

  protected render(): TemplateResult {
    return html`
      <div class="app">
        <div class="controls">
          <p-envelope
            ${ref(this.envelopeRef)}
            attack="0.1"
            decay="0.1"
            sustain="0.1"
            release="0.2"
          >
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

          <p-field>
            <label for="lowpass-frequency">Lowpass Frequency</label>
            <input
              id="lowpass-frequency"
              type="range"
              min="100"
              max="1000"
              step="1"
              .value="${this.lowpassFrequency}"
              @input="${(e: InputEvent) =>
                (this.lowpassFrequency = (e.target as HTMLInputElement).value)}"
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

  play() {
    const { attack, sustain, decay, release, duration } =
      this.envelopeRef.value!;

    playTone(
      {
        lfoFrequency: Number(this.lfoFrequency),
        toneFrequency: Number(this.toneFrequency),
        lowpassFrequency: Number(this.lowpassFrequency),
      },
      {
        attack,
        decay,
        sustain,
        release,
        duration,
      },
    );
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
