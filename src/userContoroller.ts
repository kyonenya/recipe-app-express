import * as userUseCase from './userUseCase';
import * as usersRepository from './usersRepository';
import * as postgres from './postgres';
import { Request, Response, NextFunction } from 'express';

export const index = async (req: Request, res: Response) => {
  const users = await userUseCase.readAll(
    () => usersRepository.selectAll(postgres.execute)
  )
  res.render('users/index', { users });
};

export const edit = async (req: Request, res: Response) => {
  const email = req.params.email;
  const user = await userUseCase.findByEmail(
    usersRepository.selectByEmail(postgres.execute),
    email,
  );
  res.render('users/edit', { user });
};

export const storeSubscriber = (req: Request, res: Response) => {
  
};

