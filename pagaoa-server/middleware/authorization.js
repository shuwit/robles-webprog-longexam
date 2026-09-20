import { HttpStatus } from '../config/constants.js';

const authorization = (...roles) => {
  return async (request, response, next) => {
    try {
      if (!roles.includes(request.user.role)) {
        return response.status(HttpStatus.FORBIDDEN).json({
          message: 'Access denied',
        });
      }

      next();
    } catch (error) {
      return response.status(HttpStatus.FORBIDDEN).json({
        message: 'Access denied',
      });
    }
  };
};

export default authorization;
