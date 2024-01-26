import { context } from './context';

const { sampleRate } = context;

const noiseBuffer: AudioBuffer = context.createBuffer(
  1,
  sampleRate,
  sampleRate,
);

const data = noiseBuffer.getChannelData(0);

for (let i = 0; i < noiseBuffer.length; i++) {
  data[i] = Math.random() * 2 - 1;
}

const createNoise = (): AudioBufferSourceNode => {
  const noise = context.createBufferSource();

  noise.buffer = noiseBuffer;

  return noise;
};

export { createNoise };
