import { Subscriber } from './subscriberEntity';
import { dbExecutable } from './repository';
import { QueryResult } from 'pg';

// DB schema
export interface schemable {
  name: string;
  email: string;
  zipcode: number;
}

// inverse DTO -> useCase
const entitize = ({ name, email, zipcode }: schemable): Subscriber => {
  return { name, email, zipCode: zipcode };
};

export const selectAll = async (dbExecutor: dbExecutable): Promise<Subscriber[]> => {
  const sql = 'SELECT * FROM subscribers';
  const queryResult = await dbExecutor(sql);
  return queryResult.rows.map((row: any) => entitize(row));
};

interface IInsertOne {
  (dbExecutor?: dbExecutable, subscriber: schemable): Promise<boolean>
};

export const insertOne: IInsertOne = async (dbExecutor?: dbExecutable, subscriber: schemable): Promise<boolean> => {
  const sql = 'INSERT INTO subscribers (name, email, zipcode) VALUES ($1, $2, $3);';
  const params = [subscriber.name, subscriber.email, subscriber.zipcode];
  const queryResult = await dbExecutor(sql, params);
  return queryResult.rowCount === 1;
};

export const selectByEmail = async (dbExecutor: dbExecutable, email: string): Promise<Subscriber|null> => {
  const sql = 'SELECT * FROM subscribers WHERE "email" = $1';
  const params = [email];
  const queryResult = await dbExecutor(sql, params);
  if (queryResult.rowCount === 0) return null;
  return new Subscriber(entitize(queryResult.rows[0]));
};

interface ISubscriberRepository {
  selectAll(dbExecutor: dbExecutable): Promise<Subscriber[]>;
  insertOne(dbExecutor: dbExecutable, subscriber: schemable): Promise<boolean>;
  selectByEmail(dbExecutor: dbExecutable, email: string): Promise<Subscriber|null>
};

const repository: ISubscriberRepository = {
  selectAll, insertOne, selectByEmail,
};
