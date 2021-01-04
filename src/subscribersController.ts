import { Subscriber } from './subscriberEntity';
import * as postgres from './postgres';
import * as subscriberRepository from './subscriberRepository';
import * as subscriberUseCase from './subscriberUseCase';
import { subscriberable } from './subscriberEntity';
import { Request, Response, NextFunction } from 'express';

export const showAllSubscribers = async (req: Request, res: Response) => {
  const subscribers: subscriberable[] = await subscriberUseCase.readAll(
    subscriberRepository.selectAll,
    postgres.exec,
  );
  res.render('subscribers', { subscribers });
};

export const isEmailDuplicated = async (email: string): Promise<boolean> => {
  const emailResult = await subscriberUseCase.findEmail(
    email,
    subscriberRepository.selectByEmail
  );
  return emailResult.rowCount > 0;
};

export const storeSubscriber = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const subscriber: Subscriber = new Subscriber(req.body.name, req.body.email, req.body.zipcode);

  if (await isEmailDuplicated(subscriber.email)) {
    throw new Error('メールアドレスが既に登録されています');
  }

  const response = await subscriberUseCase.createOne(
    subscriber,
    subscriberRepository.insertOne
  );
  res.render('thanks');
};
