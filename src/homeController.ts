import { Request, Response } from 'express';
import { courses } from './courses';

export const render = (viewName: string, req: Request, res: Response) => {
  res.render(viewName);
};

export const showCourses = (req: Request, res: Response) => {
  res.render('courses', { offeredCourses: courses });
};
