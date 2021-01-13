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
