import client, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { App } from '../../../src/App';
import configs from '../../../src/configs';

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
    clientSocket = createClientSocket();
    clientSocket.on('connect', () => {
      expect(clientSocket?.connected).toBeTruthy();
      done();
    });
  });
});

function createClientSocket() {
  return client(`http://localhost:${configs.PORT}`);
}
