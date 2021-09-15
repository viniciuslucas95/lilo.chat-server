import UserRouter from './UserRouter';
import RoomRouter from './RoomRouter';

export interface IRouter {
  setRoutes(route?: string): void;
}

const Router: IRouter = class {
  static setRoutes() {
    UserRouter.setRoutes('user');
    RoomRouter.setRoutes('room');
  }
};

export default Router;
