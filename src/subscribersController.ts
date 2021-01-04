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

export const storeSubscriber = async (req: Request, res: Response, next: NextFunction) => {
  const validate = async (reqBody: Request['body']) => {
    const emailResult = await subscriberUseCase.findEmail(
      subscriberRepository.selectByEmail,
      reqBody.email
    );
    if (emailResult.rowCount > 0) {
      throw new Error('メールアドレスが既に登録されています');
    }
    return reqBody;
  };

  try {
    const reqBody = await validate(req.body);
    const subscriber: Subscriber = new Subscriber(reqBody.name, reqBody.email, reqBody.zipcode);
    const response = await subscriberUseCase.createOne(
      subscriberRepository.insertOne,
      subscriber
    );
    res.render('thanks');
  } catch (err) {
    next(err);
  }
};
