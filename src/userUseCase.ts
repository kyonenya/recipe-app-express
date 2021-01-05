import { dbExecutable } from './subscriberRepository';
import { QueryResult } from 'pg';

export const readAll = async (
  execSelectAll: () => Promise<QueryResult>
) => {
  return await execSelectAll();
};
