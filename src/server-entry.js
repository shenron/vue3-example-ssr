import createApp from './app';

export default function () {
  const { app, store } = createApp();

  return { app, store };
}
