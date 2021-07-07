import { Request, Response } from "express";
import IORedis from "ioredis";

export interface MyContext {
  req: Request;
  res: Response;
  redis: IORedis.Redis;
}
