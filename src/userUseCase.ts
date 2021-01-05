import { dbExecutable } from './repository';
import { QueryResult } from 'pg';

export const readAll = async (
  execSelectAll: () => Promise<QueryResult>
) => {
  return await execSelectAll();
};
