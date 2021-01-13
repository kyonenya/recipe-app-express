import { User } from './userEntity';
import { dbExecutable } from './repository';
import { QueryResult } from 'pg';

export const readAll = async (
  execSelectAll: () => Promise<User[]>
) => {
  return await execSelectAll();
};
