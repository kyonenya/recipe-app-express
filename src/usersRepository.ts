import { dbExecutable } from './repository';
import { QueryResult } from 'pg';

export const selectAll = async (dbExecutor: dbExecutable): Promise<QueryResult> => {
  const sql = 'SELECT * FROM users';
  return await dbExecutor(sql);
};
