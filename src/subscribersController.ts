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

const validateStoreReqest = (reqBody: Request['body']) => {
  if (!reqBody.name) {
    throw new Error('名前は必須です');
  }
  return reqBody;
};

export const storeSubscriber = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await subscriberUseCase.createOne(
      subscriberRepository.insertOne,
      validateStoreReqest(req.body)
    );
    res.render('thanks');
  } catch (err) {
    console.error(err);
    next(err);
  }
};
