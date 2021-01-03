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

export const storeSubscriber = async (req: Request, res: Response, next: NextFunction) => {
  const validate = async (reqBody: Request['body']) => {
    if (!reqBody.name) {
      throw new Error('名前は必須です');
    }
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
    const response = await subscriberUseCase.createOne(
      subscriberRepository.insertOne,
      reqBody
    );
    res.render('thanks');
  } catch (err) {
    console.error(err);
    next(err);
  }
};
