import client, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { App } from '../../../src/App';
import configs from '../../../src/configs';
import { LoginUseCaseFactory } from '../../../src/factories/useCases/auth/LoginUseCaseFactory';

describe('Rota - API Info', () => {
  const app = new App();
  // const app = express();
  let clientSocket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;

  beforeAll((done) => {
    app.createServer().start(done);
  });

  afterEach(() => {
    clientSocket?.disconnect().close();
  });

  afterAll((done) => {
    app.stop(done);
  });

  it('Deve se conectar com sucesso ao websocket', (done) => {
    const execTest = async () => {
      const loginData = await LoginUseCaseFactory.make().handler({
        email: 'thiagoggth@gmail.com',
        password: 'P@sg2022'
      });
      clientSocket = createClientSocket(loginData.token);
      clientSocket.on('connect', () => {
        expect(clientSocket?.connected).toBeTruthy();
        done();
      });
      clientSocket.on('connect_error', (err) => {
        console.error(err);
        expect(clientSocket?.connected).toBeTruthy();
        done();
      });
    };

    execTest();
  });
});

function createClientSocket(token: string) {
  return client(`http://localhost:${configs.PORT}`, {
    auth: { token }
  });
}
