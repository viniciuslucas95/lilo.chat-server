import { IRouter } from '.';
import { UserController } from '../controllers';
import { Server } from '../services';

const UserRouter: IRouter = class {
  static setRoutes(route?: string) {
    Server.app.post(`/${route}`, UserController.create);
    Server.app.get(`/${route}`, UserController.getAll);
    Server.app.get(`/${route}/:id/room`, UserController.getRoom);
    Server.app.put(`/${route}/:id`, UserController.update);
    Server.app.put(`/${route}/:id/room/:roomId`, UserController.setRoom);
    Server.app.delete(`/${route}/:id`, UserController.delete);
    Server.app.delete(`/${route}/:id/room`, UserController.removeRoom);
  }
};

export default UserRouter;
