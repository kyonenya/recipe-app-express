import * as subscriberRepository from './subscriberRepository';
import { getAllSubscribersUseCase } from './subscriberUseCase';
import { subscriberable } from './subscriberEntity';
import { Request, Response, NextFunction } from 'express';

export const getAllSubscribers = async (req: any, res: Response) => {
  const subscribers: subscriberable[] = await getAllSubscribersUseCase();
  console.log('contoroller', subscribers);
  res.render('subscribers', { subscribers });
};

export const saveSubscriber = async (req: Request, res: Response) => {
  console.log(req.body);
  const values = [req.body.name, req.body.email, req.body.zipcode];
  const response = await subscriberRepository.createSubscriber(values);
  res.render('thanks');
};
