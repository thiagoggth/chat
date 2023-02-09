import express, { Application, json } from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import configs from './configs';

class ServerNotCreatedError extends Error {
  constructor(message = 'Server not created, call createServer method before start app') {
    super(message);
  }
}
export class App {
  public readonly app: Application;
  public server?: http.Server;
  private io?: SocketServer;

  constructor() {
    this.app = express();
  }

  public createServer() {
    this.configMiddlewares();
    this.configRoutes();
    this.createServers();
    this.configSocketEvents();
    return this;
  }

  private configMiddlewares() {
    this.app.use(json());
  }

  private configRoutes() {
    this.app.get('/', (req, res) => {
      return res.send({
        app: 'chat',
        version: '0.0.0'
      });
    });
  }

  private createServers() {
    this.server = http.createServer(this.app);
    this.io = new SocketServer(this.server);
  }

  private configSocketEvents() {
    if (!this.io) throw new ServerNotCreatedError();
    this.io.on('connection', (socket) => {
      console.log(socket.id);
    });
  }

  public start(cb?: () => void) {
    if (!this.server) throw new ServerNotCreatedError();

    this.server.listen(configs.PORT, () => {
      console.log('App start in host http://localhost:3333');
      if (cb) cb();
    });
  }

  // Talvez converter em uma promise
  public stop(callBack?: () => void) {
    if (!this.server) throw new ServerNotCreatedError('Server not created');
    this.server.close(async () => {
      if (callBack) callBack();
    });
  }
}
