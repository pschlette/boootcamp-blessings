import { Request, Response } from "express";

exports.helloWorld = (req: Request, res: Response) => {
  let message = req.query.message || req.body.message || "Hello World!";
  res.status(200).send(message);
};
