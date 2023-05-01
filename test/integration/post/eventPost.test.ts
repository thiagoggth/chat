import { Application } from 'express';
import client, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import supertest from 'supertest';
import { App } from '../../../src/App';
import configs from '../../../src/configs';
import { CreatePostInput } from '../../../src/modules/post/DTOs/CreatePostDtos';
import { createAndLogin, createValidDirectChannel } from '../../helpers/functions/createAndLogin';

describe('Rota - API Info', () => {
  const app = new App();
  let application: Application;
  // const app = express();
  let clientSocket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;

  beforeAll((done) => {
    application = app.createServer().app;
    app.start(done);
  });

  afterEach(() => {
    clientSocket?.disconnect().close();
  });

  afterAll((done) => {
    app.stop(done);
  });

  it('Deve receber um evento ao enviar um post', (done) => {
    const execTest = async () => {
      const { token: tokenEmitter, user } = await createAndLogin(
        'thiagoggth@gmail.com',
        'P@sg2022'
      );
      const { token: tokenSender } = await createAndLogin('thiagoggth30@gmail.com', 'P@sg2022');
      const channelCreated = await createValidDirectChannel();
      clientSocket = createClientSocket(tokenSender);

      const createDocumentDto = {
        channelId: channelCreated.id.value,
        message: 'Hello'
      } as CreatePostInput;

      clientSocket.on('postCreated', (data) => {
        try {
          expect(data.data.requestUserId).toEqual(user.id);
          expect(data.data.channelId).toEqual(channelCreated.id.value);
          expect(data.data.message).toEqual(createDocumentDto.message);
          done();
        } catch (error) {
          done(error);
        }
      });

      clientSocket.on('connect_error', (err) => {
        console.error(err);
        expect(clientSocket?.connected).toBeTruthy();
        done();
      });

      await supertest(application)
        .post('/posts')
        .send(createDocumentDto)
        .set('Authorization', 'Bearer ' + tokenEmitter);
    };

    execTest();
  });
});

function createClientSocket(token: string) {
  return client(`http://localhost:${configs.PORT}`, {
    auth: { token }
  });
}
