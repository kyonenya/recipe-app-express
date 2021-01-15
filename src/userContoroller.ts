import { User } from './userEntity';
import { Either, Left, Right, ofEither } from './monad';
import * as userUseCase from './userUseCase';
import * as usersRepository from './usersRepository';
import * as postgres from './postgres';
import { Request, Response, NextFunction } from 'express';

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
//  ofEither(true)
    .map(entitizeRequest)
    .asyncMap(invokeCreateOne)
    .map((x: string) => {
      console.log('Right');
      return x;
    })
    .map((_: any) => res.redirect('/users'))
    .mapLeft(console.error)
//    .orElse(console.error)
    ;
};

export const putUser = async (req: Request, res: Response) => {
  console.log(req.params);
  const user = entitizeRequest(req);
  console.log('Controller', user);
  const result = await userUseCase.update(
    usersRepository.update(postgres.execute),
    user,
  );
  res.redirect('/users');
};
