import { Subscriber } from './subscriberEntity';
import * as postgres from './postgres';
import * as subscriberRepository from './subscriberRepository';
import * as subscriberUseCase from './subscriberUseCase';
import { Request, Response, NextFunction } from 'express';

export const showAllSubscribers = async (req: Request, res: Response) => {
  const subscribers = await subscriberUseCase.readAll(
    subscriberRepository.selectAll,
    postgres.exec,
  );
  res.render('subscribers', { subscribers });
};

export const isEmailDuplicated = async (email: string): Promise<boolean> => {
  const emailResult = await subscriberUseCase.findEmail(
    subscriberRepository.selectByEmail,
    email,
  );
  return emailResult.rowCount > 0;
};

export const storeSubscriber = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const subscriber: Subscriber = new Subscriber(req.body.name, req.body.email, req.body.zipcode);
  if (await isEmailDuplicated(subscriber.email)) {
    throw new Error('メールアドレスが既に登録されています');
  }
  const response = await subscriberUseCase.createOne(
    subscriberRepository.insertOne,
    postgres.exec,
    subscriber,
  );
  res.render('thanks');
};
