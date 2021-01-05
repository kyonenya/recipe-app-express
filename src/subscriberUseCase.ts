// ↓useCase should not know about Repository
// import * as subscriberRepository from './subscriberRepository';
import { Subscriber } from './subscriberEntity';
import { dbExecutable } from './subscriberRepository';
import { QueryResult } from 'pg';

export const readAll = async (
  execSelectAll: () => Promise<QueryResult>
): Promise<Subscriber[]> => {
  const data = await execSelectAll();
  return data.rows.map(row => new Subscriber(row));
};

export const createOne = async (
  execInsertOne: () => Promise<QueryResult>
) => {
  return await execInsertOne();
};

export const findEmail = async (
  execSelectByEmail: () => Promise<QueryResult>
): Promise<Subscriber|null> => {
  const data = await execSelectByEmail();
  if (data.rowCount === 0) return null;
  return new Subscriber(data.rows[0]);
};
