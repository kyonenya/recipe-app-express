import { Request, Response, NextFunction } from 'express';

export const index = async (req: Request, res: Response) => {
  const dummyUsers = [
    {
      fullName: 'Robert C. Martin',
      email: 'r-martin@gmail.com',
      zipcode: 12345,
    }
  ];
  res.render('users/index', { users: dummyUsers });
};
