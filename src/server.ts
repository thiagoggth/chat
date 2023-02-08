import { App } from './App';

const bootstrap = () => {
  try {
    const app = new App();
    app.create().start();
    app.start();
  } catch (error) {
    console.log('[App]: ', error);
  }
};

bootstrap();
