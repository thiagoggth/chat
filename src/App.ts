import express, { Application, json } from 'express';
import configs from './configs';

export class App {
  public readonly server: Application;

  constructor() {
    this.server = express();
  }

  public create() {
    this.configMiddlewares();
    this.configRoutes();
    return this;
  }

  private configMiddlewares() {
    this.server.use(json());
  }

  private configRoutes() {
    this.server.get('/', (req, res) => {
      return res.send({
        app: 'chat',
        version: '0.0.0'
      });
    });
  }

  public start() {
    this.server.listen(configs.PORT, () => {
      console.log('App start in host http://localhost:3333');
    });
  }
}
