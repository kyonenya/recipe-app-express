import { User } from './userEntity';
import { IFindByEmail, IUpdate, ICreateOne } from './userUseCase';
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

export const insertOne = (dbExecutor: dbExecutable): ICreateOne => async (user: User) => {
  const sql = `
    INSERT INTO users 
      (firstname, lastname, email, zipcode, password)
    VALUES
      ($1, $2, $3, $4, $5)
    ;
  `;
  const params = [user.name.firstName, user.name.lastName, user.email, user.zipcode, user.password];
  console.log(params);
  const queryResult = await dbExecutor(sql, params);
  return queryResult.rowCount === 1; // TODO: Either<User>
}

export const update = (dbExecutor: dbExecutable): IUpdate => async (user: User) => {
  const sql = `
    UPDATE users
    SET
      "firstname" = $2
      ,"lastname" = $3
      ,"zipcode" = $4
      ,"password" = $5
    WHERE email = $1;
  `;
  const params = [user.email, user.name.firstName, user.name.lastName, user.zipcode, user.password];
  const queryResult = await dbExecutor(sql, params);
  console.log(user);
  console.log(params);
  console.log(queryResult);
  return queryResult.rowCount === 1;
};
