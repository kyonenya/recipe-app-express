import * as userUseCase from './userUseCase';
import * as usersRepository from './usersRepository';
import * as postgres from './postgres';
import { Request, Response, NextFunction } from 'express';

export const index = async (req: Request, res: Response) => {
  const users = await userUseCase.readAll(
    () => usersRepository.selectAll(postgres.execute)
  );
  console.log(users.rows);
  const dummyUsers = [
    {
      fullName: 'Robert C. Martin',
      email: 'r-martin@gmail.com',
      zipcode: 12345,
    }
  ];
  res.render('users/index', { users: users.rows });
};
