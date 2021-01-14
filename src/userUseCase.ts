import { User } from './userEntity';
import { dbExecutable } from './repository';
import { QueryResult } from 'pg';

export const readAll = async (
  execSelectAll: () => Promise<User[]>
) => {
  return await execSelectAll();
};

export interface IFindByEmail {
  (email: string): Promise<User|null>
}
export const findByEmail = async (
  invokeFindByEmail: IFindByEmail,
  email: string
) => {
  return await invokeFindByEmail(email);
}

export interface ICreateOne {
  (user: User): Promise<boolean>; // TODO: Either<User>
}
export const createOne = async (
  invokeCreateOne: ICreateOne,
  user: User,
) => {
  return await invokeCreateOne(user);
};

export interface IUpdate {
  (user: User): Promise<boolean>;
}
export const update = async (
  invokeUpdate: IUpdate,
  user: User,
) => {
  return await invokeUpdate(user);
};
