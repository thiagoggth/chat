import { Router } from 'express';
import { HandleResponse } from '../../infra/HandleResponse';
import { IRoutes } from '../../infra/IRoute';
import { adaptRoute } from '../../infra/adapters/expressRouteAdapter';
import { Id } from '../../modules/@shared/domain/valueObjects/Id';
import { CreateUserOutput } from '../../modules/user/DTOs/CreateUserDTO';
import { CreateUserController } from '../../modules/user/controllers/CreateUserController';
import { ListUsersController } from '../../modules/user/controllers/ListUsersController';
import { UserRepository } from '../../modules/user/repositories/UserRepository';

export class UserRoutes implements IRoutes {
  private router: Router;

  public constructor(
    private createUserController: CreateUserController,
    private listUsersController: ListUsersController
  ) {
    this.router = Router();
  }

  public getRouter(): Router {
    this.router.post('/users', adaptRoute(this.createUserController));
    this.router.get('/users', adaptRoute(this.listUsersController));
    this.router.get('/users/:id', async (req, res) => {
      const id = req.params?.id;
      const user = await new UserRepository().findById(new Id(id));
      if (!user) return HandleResponse.notFound('user not found');
      const result = HandleResponse.success(new CreateUserOutput(user), 'User found');
      return res.status(result.status).send(result);
    });
    return this.router;
  }
}
