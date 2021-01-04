// ↓useCase should not know about Repository
// import * as subscriberRepository from './subscriberRepository';
import { subscriberable, Subscriber } from './subscriberEntity';
import { QueryResult } from 'pg';

export const readAll = async (
  getAllSubscribers: () => Promise<QueryResult> // 高階関数でDI
): Promise<subscriberable[]> => {
  const data = await getAllSubscribers();
  return data.rows;
};

export const createOne = async (
  subscriber: Subscriber,
  createSubscriber: (values: any[]) => Promise<any>
) => {
  const values = [subscriber.name, subscriber.email, subscriber.zipCode];
  return createSubscriber(values);
};

export const findEmail = async (
  email: string,
  selectByEmail: (values: string[]) => Promise<QueryResult>
) => {
  return selectByEmail([email]);
};
