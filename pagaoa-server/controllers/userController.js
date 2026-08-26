import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import { HttpStatus } from '../config/constants.js';

const formatUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  isAdmin: user.isAdmin,
  token: generateToken(user._id),
});

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(HttpStatus.OK).json(users);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
    }

    res.status(HttpStatus.OK).json(user);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Name, email, and password are required' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    res.status(HttpStatus.CREATED).json(formatUser(user));
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.status(HttpStatus.OK).json(formatUser(user));
    }

    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid email or password' });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  res.status(HttpStatus.OK).json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin =
      req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(HttpStatus.OK).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
    }

    res.status(HttpStatus.OK).json({ message: 'User removed' });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
