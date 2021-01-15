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

const awaiter = (fn: Function) => (thenable: Promise<unknown>) => {
  return thenable.then(x => fn(x));
}

export const createUser = async (req: Request, res: Response) => {
  const invokeCreateOne: (user: User) => Promise<Either<any>> = usersRepository.insertOne(postgres.execute);
  // TODO: resolve Promise in chain
  Right.of(req)
    .map(entitizeRequest)
    .map(invokeCreateOne)
    .map(awaiter(<T>(x: T) => x))
    .map(awaiter((_: any) => res.redirect('/users')));
//    .map((x: any) => {
//      x.then((x: any) => res.redirect('/users'));
//    })
//    .then((x) => {
//      console.log(x);
//      return x;
//    })
//    .then((_: any) => {
//      res.redirect('/users');
//      return _;
//    })
//    .orElse(console.error);
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
