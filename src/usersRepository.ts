import { User } from './userEntity';
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
