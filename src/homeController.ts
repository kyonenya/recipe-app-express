import { Request, Response } from 'express';

export const render = (viewName: string, req: Request, res: Response) => {
  res.render(viewName);
};
