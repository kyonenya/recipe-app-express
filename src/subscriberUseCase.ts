// ↓useCase should not know about Repository
// import * as subscriberRepository from './subscriberRepository';
import { Subscriber } from './subscriberEntity';
import { dbExecutable } from './subscriberRepository';
import { QueryResult } from 'pg';

export const readAll = async ({ selectAll, dbExecutor }: {
  selectAll: (executor: dbExecutable) => Promise<QueryResult>;
  dbExecutor: dbExecutable;
}): Promise<Subscriber[]> => {
  const data = await selectAll(dbExecutor);
  return data.rows.map(row => new Subscriber(row.name, row.email, row.zipcode));
};

export const createOne = async ({ insertOne, dbExecutor, subscriber }: {
  insertOne: (dbExecutor: dbExecutable, subscriber: Subscriber) => Promise<QueryResult>;
  dbExecutor: dbExecutable;
  subscriber: Subscriber;
}) => {
  return await insertOne(dbExecutor, subscriber);
};

export const findEmail = async ({ selectByEmail, dbExecutor, email }: {
  selectByEmail: (dbExecutor: dbExecutable, email: string) => Promise<QueryResult>;
  dbExecutor: dbExecutable;
  email: string;
}) => {
  const data = await selectByEmail(dbExecutor, email);
  const row = data.rows[0];
  return new Subscriber(row.name, row.email, row.zipcode);
};
