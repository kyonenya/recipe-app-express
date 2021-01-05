import { Subscriber } from './subscriberEntity';
import { dbExecutable } from './repository';
import { QueryResult } from 'pg';
// ↓Repository should not know about Framework Layer
// import * as postgres from './postgres';

// schema
export type schemable = {
  name: string;
  email: string;
  zipcode: number;
}

export const selectAll = async (executor: dbExecutable): Promise<QueryResult> => {
  const sql = 'SELECT * FROM subscribers';
  return await executor(sql);
};

export const insertOne = async (executor: dbExecutable, subscriber: Subscriber) => {
  const sql = 'INSERT INTO subscribers (name, email, zipcode) VALUES ($1, $2, $3);';
  const params = [subscriber.name, subscriber.email, subscriber.zipCode];
  return await executor(sql, params);
};

export const selectByEmail = async (executor: dbExecutable, email: string): Promise<QueryResult> => {
  const sql = 'SELECT * FROM subscribers WHERE "email" = $1';
  const params = [email];
  return await executor(sql, params);
};
