import { HttpStatus } from '../config/constants.js';

export const sendSuccess = (
  res,
  {
    status = HttpStatus.OK,
    message,
    data = null,
    extra = {},
  }
) => {
  const count = Array.isArray(data) ? data.length : data == null ? 0 : 1;

  return res.status(status).json({
    success: true,
    message,
    count,
    data,
    ...extra,
  });
};

export const sendError = (
  res,
  {
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    message,
  }
) => {
  return res.status(status).json({
    success: false,
    message,
    count: 0,
    data: null,
  });
};
