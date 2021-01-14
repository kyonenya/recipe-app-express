import { User } from './userEntity';
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
  const invokeCreateOne: userUseCase.ICreateOne = usersRepository.insertOne(postgres.execute);
  // TODO: chain
  const user = entitizeRequest(req);
  const either = await invokeCreateOne(user);
  either.map((x) => console.log(x));
  res.redirect('/users');
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
