import { App } from './App';

const bootstrap = () => {
  try {
    const app = new App();
    app.createServer().start();
  } catch (error) {
    console.log('[App]: ', error);
  }
};

bootstrap();
