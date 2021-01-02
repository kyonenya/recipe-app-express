import * as repository from './subscriberRepository';
import { Request, Response, NextFunction } from 'express';

export const getAllSubscribers = async (req: any, res: Response) => {
  const subscribers = await repository.getAllSubscribers();
  console.log(subscribers.rows);
  res.render('subscribers', { subscribers: subscribers.rows })
};
