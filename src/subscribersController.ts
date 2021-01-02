import * as repository from './subscriberRepository';
import { Request, Response, NextFunction } from 'express';

export const getAllSubscribers = async (req: any, res: Response) => {
  res.status(200);
  const data = await repository.getAllSubscribers();
  console.log(data);
  res.send(data);
};
