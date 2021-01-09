import { Subscriber } from './subscriberEntity';
import { schemable } from './subscribersRepository';

// DTO -> repository
const schemize = ({ name, email, zipCode }: Subscriber): schemable => {
  return { name, email, zipcode: zipCode };
};

export interface IReadAll {
  (): Promise<Subscriber[]>
};
export const readAll = async (
  invokeReadAll: IReadAll
): Promise<Subscriber[]> => {
  return await invokeReadAll();
};

export const createOne = async (
  execInsertOne: (params: schemable) => Promise<boolean>,
  subscriber: Subscriber,
) => {
  return await execInsertOne(schemize(subscriber));
};

export const findEmail = async (
  execSelectByEmail: () => Promise<Subscriber|null>
): Promise<Subscriber|null> => {
  return await execSelectByEmail();
};
