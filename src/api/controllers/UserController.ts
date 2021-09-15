import { Request, Response } from 'express';

import { RoomModel, UserModel } from '../models';
import { IResponse } from '.';

export class UserController {
  private static setFields = ['name'];
  private static getFields = ['id', ...UserController.setFields];

  static async create(req: Request, res: Response) {
    try {
      const { id }: any = await UserModel.create(req.body, {
        fields: UserController.setFields,
      });

      const response: IResponse = {
        message: 'user created',
        data: { id },
      };

      return res.status(201).json(response);
    } catch ({ errors }) {
      const response: IResponse = {
        message: errors ? errors[0].message : "couldn't create the user",
      };

      return res.status(400).json(response);
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const users = await UserModel.findAll({
        attributes: UserController.getFields,
        include: { association: 'room' },
      });

      const response: IResponse = {
        message: 'users gotten',
        data: users,
      };

      return res.json(response);
    } catch ({ errors }) {
      const response: IResponse = {
        message: errors ? errors[0].message : "couldn't get the users",
      };

      return res.status(400).json(response);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const user = await UserModel.findByPk(req.params.id);

      if (!user) {
        const response: IResponse = {
          message: "user doesn't exist",
        };

        return res.status(400).json(response);
      }

      user.destroy();

      const response: IResponse = {
        message: 'user deleted',
      };

      return res.json(response);
    } catch ({ errors }) {
      const response: IResponse = {
        message: errors ? errors[0].message : "couldn't delete the user",
      };

      return res.status(400).json(response);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const user: any = await UserModel.findByPk(req.params.id);

      if (!user) {
        const response: IResponse = {
          message: "user doesn't exist",
        };

        return res.status(400).json(response);
      }

      user.name = req.body.name;
      user.save();

      const response: IResponse = {
        message: 'user updated',
      };

      return res.json(response);
    } catch ({ errors }) {
      const response: IResponse = {
        message: errors ? errors[0].message : "couldn't update the user",
      };

      return res.status(400).json(response);
    }
  }

  static async setRoom(req: Request, res: Response) {
    try {
      const [room, user]: any = await Promise.all([
        RoomModel.findByPk(req.params.roomId),
        UserModel.findByPk(req.params.id),
      ]);

      if (!room) {
        const response: IResponse = {
          message: "room doesn't exist",
        };

        return res.status(400).json(response);
      }

      if (!user) {
        const response: IResponse = {
          message: "user doesn't exist",
        };

        return res.status(400).json(response);
      }

      user.setRoom(room);

      const response: IResponse = {
        message: "user's room setted",
      };

      return res.json(response);
    } catch ({ errors }) {
      const response: IResponse = {
        message: errors ? errors[0].message : "couldn't set the user's room",
      };

      return res.status(400).json(response);
    }
  }

  static async getRoom(req: Request, res: Response) {
    try {
      const user: any = await UserModel.findByPk(req.params.id);

      if (!user) {
        const response: IResponse = {
          message: "user doesn't exist",
        };

        return res.status(400).json(response);
      }

      const room = await user.getRoom();

      if (!room) {
        const response: IResponse = {
          message: "room doesn't exist",
        };

        return res.status(400).json(response);
      }

      const response: IResponse = {
        message: 'room found',
        data: room,
      };

      return res.json(response);
    } catch ({ errors }) {
      const response: IResponse = {
        message: errors ? errors[0].message : "couldn't get the user's room",
      };

      return res.status(400).json(response);
    }
  }

  static async removeRoom(req: Request, res: Response) {
    try {
      const user: any = await UserModel.findByPk(req.params.id);

      if (!user) {
        const response: IResponse = {
          message: "user doesn't exist",
        };

        return res.status(400).json(response);
      }

      const room = await user.getRoom();

      if (!room) {
        const response: IResponse = {
          message: "room doesn't exist",
        };

        return res.status(400).json(response);
      }

      user.removeRoom(room);

      const response: IResponse = {
        message: "user's room removed",
      };

      return res.json(response);
    } catch ({ errors }) {
      const response: IResponse = {
        message: errors ? errors[0].message : "couldn't remove the user's room",
      };

      return res.status(400).json(response);
    }
  }
}
