import { Request, Response } from 'express';

import { RoomModel } from '../models';
import { IResponse } from '.';

export class RoomController {
  private static setFields = ['password'];
  private static getFields = ['id', ...RoomController.setFields];

  static async create(req: Request, res: Response) {
    try {
      const { id }: any = await RoomModel.create(req.body, {
        fields: RoomController.setFields,
      });

      const response: IResponse = {
        message: 'room created',
        data: { id },
      };

      return res.status(201).json(response);
    } catch ({ errors }) {
      const response: IResponse = {
        message: errors ? errors[0].message : "couldn't create the room",
      };

      return res.status(400).json(response);
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const rooms = await RoomModel.findAll({
        attributes: RoomController.getFields,
      });

      const response: IResponse = {
        message: 'rooms gotten',
        data: rooms,
      };

      return res.json(response);
    } catch ({ errors }) {
      const response: IResponse = {
        message: errors ? errors[0].message : "couldn't get the rooms",
      };

      return res.status(400).json(response);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const room = await RoomModel.findByPk(req.params.id);

      if (!room) {
        const response: IResponse = {
          message: "room doesn't exist",
        };

        return res.status(400).json(response);
      }

      room.destroy();

      const response: IResponse = {
        message: 'room deleted',
      };

      return res.json(response);
    } catch ({ errors }) {
      const response: IResponse = {
        message: errors ? errors[0].message : "couldn't delete the room",
      };

      return res.status(400).json(response);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const room: any = await RoomModel.findByPk(req.params.id);

      if (!room) {
        const response: IResponse = {
          message: "room doesn't exist",
        };

        return res.status(400).json(response);
      }

      room.password = req.body.password;
      room.save();

      const response: IResponse = {
        message: 'room updated',
      };

      return res.json(response);
    } catch ({ errors }) {
      const response: IResponse = {
        message: errors ? errors[0].message : "couldn't update the room",
      };

      return res.status(400).json(response);
    }
  }
}
