import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/constants.js';

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    SECRET_KEY,
    {
      expiresIn: '30d',
    }
  );
};

export default generateToken;
