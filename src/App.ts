import express, { Application, json } from 'express';
import http from 'http';
import path from 'path';
import { Server as SocketServer } from 'socket.io';
import { DataSource } from 'typeorm';
import { AuthorizeIoMiddleware } from './app/middlewares/AuthorizeIoMiddeware';
import configs from './configs';
import { AuthRoutesFactory } from './factories/routes/auth/AuthRoutes';
import { ChannelRoutesFactory } from './factories/routes/channel/ChannelRoutesFactory';
import { PostRoutesFactory } from './factories/routes/post/PostRoutesFactory';
import { UserRoutesFactory } from './factories/routes/user/UserRoutesFactory';
import { OnCreatePostUseCaseFactory } from './factories/useCases/posts/OnCreatePostUseCaseFactory';
import event from './modules/@shared/services/event';
import { ChannelSchema } from './modules/channel/schemas/ChannelSchema';
import { PostSchema } from './modules/post/schemas/PostSchema';
import { UserSchema } from './modules/user/Schemas/UserSchema';

class ServerNotCreatedError extends Error {
  public constructor(message = 'Server not created, call createServer method before start app') {
    super(message);
  }
}
export class App {
  public readonly app: Application;
  public server?: http.Server;
  private static _io?: SocketServer;
  public static datSource: DataSource;

  public constructor() {
    this.app = express();
    App.CreateDataSource();
    this._registerAppEvents();
  }

  private static CreateDataSource() {
    App.datSource = new DataSource({
      type: 'sqlite',
      database: path.resolve('data.db'),
      entities: [UserSchema, PostSchema, ChannelSchema],
      synchronize: true
    });
  }

  private _registerAppEvents() {
    event.on('postCreated', OnCreatePostUseCaseFactory.make());
  }

  public createServer() {
    this.configRestMiddlewares();
    this.configRoutes();
    this.createServers();
    this._configIoMiddlewares();
    this.configSocketEvents();
    return this;
  }

  private createServers() {
    this.server = http.createServer(this.app);
    App._io = new SocketServer(this.server);
  }

  private configRoutes() {
    this.app.get('/', (req, res) => {
      return res.send({
        app: 'chat',
        version: '0.0.0'
      });
    });

    this.app.use(UserRoutesFactory.make().getRouter());
    this.app.use(PostRoutesFactory.make().getRouter());
    this.app.use(ChannelRoutesFactory.make().getRouter());
    this.app.use(AuthRoutesFactory.make().getRouter());
  }

  private _configIoMiddlewares() {
    App._io?.use(AuthorizeIoMiddleware.execute);
  }

  private configRestMiddlewares() {
    this.app.use(json());
  }

  private configSocketEvents() {
    if (!App._io) throw new ServerNotCreatedError();
    App._io.on('connection', async (socket) => {
      const userId = socket.data.requestUser?.id;
      const repo = App.datSource.getRepository(UserSchema);
      await repo.update(userId, { socketId: socket.id });
    });
  }

  public async start(cb?: () => void) {
    if (!this.server) throw new ServerNotCreatedError();
    await this.connectDatabase();
    this.server.listen(configs.PORT, () => {
      console.log('App start in host http://localhost:3333');
      if (cb) cb();
    });
  }

  private async connectDatabase() {
    try {
      await App.datSource.initialize();
      console.log('Database connected');
    } catch (error) {
      console.error('[App]: Error to connect to database: ', error);
    }
  }

  // Talvez converter em uma promise
  public stop(callBack?: () => void) {
    if (!this.server) throw new ServerNotCreatedError('Server not created');
    this.server.close(async () => {
      if (callBack) callBack();
    });
  }

  public static get io() {
    if (!this._io) throw new ServerNotCreatedError();
    return this._io;
  }
}
