import * as repository from './subscriberRepository';
import { Request, Response, NextFunction } from 'express';

export const getAllSubscribers = async (req: any, res: Response) => {
  const subscribers = await repository.getAllSubscribers();
  console.log(subscribers.rows);
  res.render('subscribers', { subscribers: subscribers.rows })
};

export const saveSubscriber = async (req: Request, res: Response) => {
  console.log(req.body);
  const values = [req.body.name, req.body.email, req.body.zipcode];
  const response = await repository.createSubscriber(values);
  res.render('thanks');
};
