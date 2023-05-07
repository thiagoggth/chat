import { Application } from 'express';
import supertest from 'supertest';
import { App } from '../../../src/App';

describe('Rota - API Info', () => {
  const app = new App();
  let application: Application;

  beforeAll(async () => {
    application = app.createServer().app;
  });

  it('Deve retornar informações básicas da api', async () => {
    const response = await supertest(application).get('/');

    expect(response.status).toBe(200);
    expect(response.body.app).toBe('chat');
    expect(response.body.version).toBe('0.0.0');
  });
});
