import { QueryResult } from 'pg';

export interface dbExecutable {
  (sql: string, params?: (string | number)[] | undefined): Promise<QueryResult>;
};
