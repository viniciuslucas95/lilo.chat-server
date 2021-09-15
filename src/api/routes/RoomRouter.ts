import { IRouter } from '.';
import { RoomController } from '../controllers';
import { Server } from '../services';

const RoomRouter: IRouter = class {
  static setRoutes(route?: string) {
    Server.app.post(`/${route}`, RoomController.create);
    Server.app.get(`/${route}`, RoomController.getAll);
    Server.app.delete(`/${route}/:id`, RoomController.delete);
    Server.app.put(`/${route}/:id`, RoomController.update);
  }
};

export default RoomRouter;
