import { User } from './userEntity';
import { IFindByEmail } from './userUseCase';
import { dbExecutable } from './repository';
import { QueryResult } from 'pg';

type schemable = {
  firstname: string;
  lastname: string;
  email: string;
  zipcode: number;
};

const entitize = (row: schemable): User => {
  return new User({
    name: {
      firstName: row.firstname,
      lastName: row.lastname,
    },
    email: row.email,
    zipcode: row.email,
  });
}

export const selectAll = async (dbExecutor: dbExecutable): Promise<User[]> => {
  const sql = 'SELECT * FROM users';
  const queryResult = await dbExecutor(sql);
  return queryResult.rows.map((row) => entitize(row));
};

export const selectByEmail = (dbExecutor: dbExecutable): IFindByEmail => async (email: string) => {
  const sql = 'SELECT * FROM users WHERE "email" = $1';
  const params = [email];
  const queryResult = await dbExecutor(sql, params);
  if (queryResult.rowCount === 0) return null;
  return entitize(queryResult.rows[0]);
}
