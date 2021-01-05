import { Subscriber } from './subscriberEntity';
import { schemable } from './subscribersRepository';

// DTO -> repository
const schemize = ({ name, email, zipCode }: Subscriber): schemable => {
  return { name, email, zipcode: zipCode };
};

export const readAll = async (
  execSelectAll: () => Promise<Subscriber[]>
): Promise<Subscriber[]> => {
  return await execSelectAll();
};

export const createOne = async (
  execInsertOne: (params: any) => Promise<boolean>,
  subscriber: Subscriber,
) => {
  return await execInsertOne(schemize(subscriber));
};

export const findEmail = async (
  execSelectByEmail: () => Promise<Subscriber|null>
): Promise<Subscriber|null> => {
  return await execSelectByEmail();
};
