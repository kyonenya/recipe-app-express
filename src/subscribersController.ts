import * as repository from './subscriberRepository';
import { Request, Response, NextFunction } from 'express';

export const getAllSubscribers = async (req: any, res: Response, next: NextFunction) => {
  const data = await repository.getAllSubscribers();
  console.log(data);
  res.status(200);;
  res.send(data);
  next();
};
