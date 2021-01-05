import { Subscriber } from './subscriberEntity';
import { schemable } from './subscribersRepository';
import { dbExecutable } from './repository';
/** 
 * @deprecated
 * UseCase should receive pure Entity. So should not know anout QueryResult.
 */
import { QueryResult } from 'pg';

// inverse DTO
const entitize = ({ name, email, zipcode }: schemable): Subscriber => {
  return { name, email, zipCode: zipcode };
};

// DTO
const schemize = ({ name, email, zipCode }: Subscriber): schemable => {
  return { name, email, zipcode: zipCode };
};

export const readAll = async (
  execSelectAll: () => Promise<QueryResult>
): Promise<Subscriber[]> => {
  const data = await execSelectAll();
  return data.rows.map(row => new Subscriber(entitize(row)));
};

export const createOne = async (
  execInsertOne: (params: any) => Promise<boolean>,
  subscriber: Subscriber,
) => {
  return await execInsertOne(schemize(subscriber));
};

export const findEmail = async (
  execSelectByEmail: () => Promise<QueryResult>
): Promise<Subscriber|null> => {
  const data = await execSelectByEmail();
  if (data.rowCount === 0) return null;
  return new Subscriber(entitize(data.rows[0]));
};
