// ↓useCase should not know about Repository
// import * as subscriberRepository from './subscriberRepository';
import { subscriberable, Subscriber } from './subscriberEntity';
import { dbExecutable } from './subscriberRepository';
import { QueryResult } from 'pg';

export const readAll = async (
  selectAll: (executor: dbExecutable) => Promise<QueryResult>,
  executor: dbExecutable,
): Promise<Subscriber[]> => {
  const data = await selectAll(executor);
  return data.rows.map(row => new Subscriber(row.name, row.email, row.zipcode));
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
