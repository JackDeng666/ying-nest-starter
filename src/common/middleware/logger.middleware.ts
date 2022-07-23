import { Request, Response } from 'express';

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: () => void,
) {
  const { method, path } = req;
  if (false) {
    console.log(res);
  }
  console.log(`${method} ${path}`);
  next();
}
