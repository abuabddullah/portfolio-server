import { Response } from "express";

type TResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.json({
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  });
};

export default sendResponse;
