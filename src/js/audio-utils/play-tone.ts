import { context } from '@/audio-utils/context.ts';
import { Envelope } from '@/components/p-envelope';

type ToneConfig = {
  toneFrequency: number;
  lfoFrequency: number;
  lowpassFrequency: number;
};

const playTone = (config: ToneConfig, envelope: Envelope) => {
  const { currentTime } = context;

  // Create an oscillator
  const oscillator = new OscillatorNode(context, {
    frequency: config.toneFrequency,
    type: 'square',
  });

  // Create a low-pass filter
  const lowPass = new BiquadFilterNode(context, {
    type: 'lowpass',
    frequency: config.lowpassFrequency,
  });

  // Create an LFO (Low-Frequency Oscillator) for modulation
  const lfo = new OscillatorNode(context, {
    type: 'sine',
    frequency: config.lfoFrequency,
  });

  const lfoGain = new GainNode(context, { gain: 50 });

  const { attack, decay, sustain, release } = envelope;

  const envelopeGain = context.createGain();
  envelopeGain.gain.setValueAtTime(0, currentTime);
  envelopeGain.gain.linearRampToValueAtTime(1, currentTime + attack);
  envelopeGain.gain.linearRampToValueAtTime(1, currentTime + attack + decay);
  envelopeGain.gain.linearRampToValueAtTime(
    1,
    currentTime + attack + decay + sustain,
  );
  envelopeGain.gain.linearRampToValueAtTime(
    0,
    currentTime + attack + decay + sustain + release,
  );

  // Connect the oscillator to the filter, then the filter to the envelope, and finally the envelope to the destination
  oscillator.connect(lowPass);
  lowPass.connect(envelopeGain);
  envelopeGain.connect(context.destination);

  // Connect the LFO to modulate the filter frequency
  lfo.connect(lfoGain);
  lfoGain.connect(lowPass.frequency);

  // Start the LFO and oscillator
  lfo.start();
  oscillator.start();

  // Stop the LFO and oscillator after a duration (adjust as needed)
  console.log(currentTime, typeof envelope.attack);
  lfo.stop(currentTime + envelope.duration);
  oscillator.stop(currentTime + envelope.duration);

  console.log(envelope.duration);
};

export { playTone };
