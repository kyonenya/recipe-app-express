// ↓useCase should not know about Repository
// import * as subscriberRepository from './subscriberRepository';
import { Subscriber } from './subscriberEntity';
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
  insertOne: any,
  dbExecutor: dbExecutable,
  subscriber: Subscriber,
) => {
  const params = [subscriber.name, subscriber.email, subscriber.zipcode];
  return await insertOne(dbExecutor, params);
};

export const findEmail = async (
  selectByEmail: (values: string[]) => Promise<QueryResult>,
  email: string,
) => {
  return selectByEmail([email]);
};
