import { Subscriber } from './subscriberEntity';
import * as postgres from './postgres';
import * as subscribersRepository from './subscribersRepository';
import * as subscriberUseCase from './subscriberUseCase';
import { Request, Response, NextFunction } from 'express';

export const showAllSubscribers = async (req: Request, res: Response) => {
  const subscribers = await subscriberUseCase.readAll(
    () => subscribersRepository.selectAll(postgres.execute)
  );
  res.render('subscribers', { subscribers });
};

export const isEmailDuplicated = async (email: string): Promise<boolean> => {
  return !(await subscriberUseCase.findEmail(
    () => subscribersRepository.selectByEmail(postgres.execute, email)
  ) === null);
};

export const storeSubscriber = async (req: Request, res: Response): Promise<void> => {
  const subscriber: Subscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipcode: req.body.zipcode,
  });
  if (await isEmailDuplicated(subscriber.email)) {
    throw new Error('メールアドレスが既に登録されています');
  }
  const response = await subscriberUseCase.createOne(
    (params) => subscribersRepository.insertOne(postgres.execute, params),
    subscriber,
  );
  res.render('thanks');
};
