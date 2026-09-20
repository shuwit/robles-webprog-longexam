import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { HttpStatus, SECRET_KEY } from '../config/constants.js';

const authentication = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Invalid Request!',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Invalid Request!',
      });
    }

    const decodedToken = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decodedToken.id).select('-password');

    if (!user) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Invalid request!',
      });
    }

    if (user.isActive === false) {
      return response.status(HttpStatus.FORBIDDEN).json({
        message: 'Account is inactive. Contact an administrator.',
      });
    }

    request.user = user;
    next();
  } catch (error) {
    return response.status(HttpStatus.UNAUTHORIZED).json({
      message: 'Invalid request!',
    });
  }
};

export default authentication;
