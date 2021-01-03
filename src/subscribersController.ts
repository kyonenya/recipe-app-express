import * as subscriberRepository from './subscriberRepository';
import * as subscriberUseCase from './subscriberUseCase';
import { subscriberable } from './subscriberEntity';
import { Request, Response, NextFunction } from 'express';

export const showAllSubscribers = async (req: Request, res: Response) => {
  try {
    const subscribers: subscriberable[] = await subscriberUseCase.readAll(
      subscriberRepository.selectAll // DI、スイッチを渡す
    );
    res.render('subscribers', { subscribers });
  } catch (err) {
    console.error(err);
  }
};

export const storeSubscriber = async (req: Request, res: Response) => {
  try {
    const response = await subscriberUseCase.createOne(
      subscriberRepository.insertOne,
      req.body
    );
    res.render('thanks');
  } catch (err) {
    console.error(err);
  }
};
