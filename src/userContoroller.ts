import { User } from './userEntity';
import { Either, Left, Right, ofEither } from './monad';
import * as userUseCase from './userUseCase';
import * as usersRepository from './usersRepository';
import * as postgres from './postgres';
import { Request, Response, NextFunction } from 'express';

const tap = <T>(fn: (x: T) => void) => (x: T) => {
  fn(x);
  return x;
};

const entitizeRequest = (req: Request) => new User({
  name: { firstName: req.body.first, lastName: req.body.last },
  email: req.body.email,
  zipcode: req.body.zipCode,
  password: req.body.password,
});

export const showAllUsers = async (req: Request, res: Response) => {
  const users = await userUseCase.readAll(
    () => usersRepository.selectAll(postgres.execute)
  );
  res.render('users/index', { users });
};

export const showEditForm = async (req: Request, res: Response) => {
  const email = req.params.email;
  const user = await userUseCase.findByEmail(
    usersRepository.selectByEmail(postgres.execute),
    email,
  );
  res.render('users/edit', { user });
};

export const createUser = async (req: Request, res: Response) => {
  const invokeCreateOne: (user: User) => Promise<Either<any>> = usersRepository.insertOne(postgres.execute);

  ofEither(req)
    .map(entitizeRequest)
    .asyncMap(invokeCreateOne)
    .map(tap(console.log))
    .map(tap((_) => res.redirect('/users')))
    .mapLeft(console.error)
    ;
};

export const putUser = async (req: Request, res: Response) => {
  const invokeUpdateOne: (user: User) => Promise<Either<any>> = usersRepository.update(postgres.execute);

  ofEither(req)
    .map(entitizeRequest)
    .asyncMap(invokeUpdateOne)
    .mapLeft(tap(console.error))
    .map(tap(console.log))
    .map(tap(_ => res.redirect('/users')))
    ;
};
