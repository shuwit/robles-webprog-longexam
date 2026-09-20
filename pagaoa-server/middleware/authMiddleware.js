import authentication from './authentication.js';
import authorization from './authorization.js';

export const protect = authentication;
export const admin = authorization('Admin');

export default authentication;
