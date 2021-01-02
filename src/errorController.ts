import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';

export const notFound = (req: Request, res: Response) => {
  const errCode = httpStatus.NOT_FOUND;
  res.status(errCode);
  res.send('Not found.');
};

export const internalError = (err: Error, req: Request, res: Response, next: NextFunction) =>{
  console.error(err.stack);
  const errCode = httpStatus.INTERNAL_SERVER_ERROR;
  res.status(errCode);
  res.send(`${errCode} | Sorry, our application is experiencing a problem.`);
};
