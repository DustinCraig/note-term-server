import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    schema.parse(req.body);
    next();
  };
}
