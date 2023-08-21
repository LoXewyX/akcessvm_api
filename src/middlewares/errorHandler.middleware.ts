import { NextFunction, Request, Response } from 'express';
import { logEvents } from './logEvents.middleware';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logEvents(`${err.name}: ${err.message}`, 'error.log');
    console.error(err.stack)
    res.status(500).send(err.message);
}

export default errorHandler;