import * as subscriberRepository from './subscriberRepository';
import { getAllSubscribersUseCase, saveSubscriberUseCase } from './subscriberUseCase';
import { subscriberable } from './subscriberEntity';
import { Request, Response, NextFunction } from 'express';

export const getAllSubscribers = async (req: Request, res: Response) => {
  try {
    const subscribers: subscriberable[] = await getAllSubscribersUseCase(
      subscriberRepository.getAllSubscribers // DI、スイッチを渡す
    );
    res.render('subscribers', { subscribers });
  } catch (err) {
    console.error(err);
  }
};

export const saveSubscriber = async (req: Request, res: Response) => {
  const response = await saveSubscriberUseCase(
    subscriberRepository.createSubscriber,
    req.body
  );
  res.render('thanks');
};
