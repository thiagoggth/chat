import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../modules/@shared/controllers/BaseController';
import { HttpRequest } from './HttpAdapter';

export const adaptRoute = (controller: BaseController) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params,
      query: req.query
    };
    const httpResponse = await controller.execute(httpRequest);
    res.status(httpResponse.status).send(httpResponse.body);
    next();
  };
};

type Mid = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const adaptMiddleware = (controller: { execute: Mid }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await controller.execute(req, res, next);
  };
};
