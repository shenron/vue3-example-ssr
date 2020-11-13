import createApp from './app';

export default function () {
  const { app, store, router } = createApp();

  return { app, store, router };
}
