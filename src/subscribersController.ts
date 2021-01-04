import { Subscriber } from './subscriberEntity';
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
    // console.error(err);
  }
};

export const isEmailDuplicated = async (email: string): Promise<boolean> => {
  const emailResult = await subscriberUseCase.findEmail(
    subscriberRepository.selectByEmail,
    email
  );
  return emailResult.rowCount > 0;
};

export const storeSubscriber = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subscriber: Subscriber = new Subscriber(req.body.name, req.body.email, req.body.zipcode);

    if (await isEmailDuplicated(subscriber.email)) {
      throw new Error('メールアドレスが既に登録されています');
    }

    const response = await subscriberUseCase.createOne(
      subscriber,
      subscriberRepository.insertOne
    );
    res.render('thanks');
  } catch (err) {
    next(err);
  };
};
