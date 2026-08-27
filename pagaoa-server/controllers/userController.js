import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import { HttpStatus } from '../config/constants.js';

const formatUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  isAdmin: user.isAdmin,
  isActive: user.isActive,
  token: generateToken(user._id),
});

const publicUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  isAdmin: user.isAdmin,
  isActive: user.isActive,
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

    if (password.length < 6) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Password must be at least 6 characters' });
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

    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid email or password' });
    }

    if (user.isActive === false) {
      return res.status(HttpStatus.FORBIDDEN).json({
        message: 'Account is inactive. Contact an administrator.',
      });
    }

    return res.status(HttpStatus.OK).json(formatUser(user));
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  res.status(HttpStatus.OK).json(publicUser(req.user));
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    const updatedUser = await user.save();
    res.status(HttpStatus.OK).json(formatUser(updatedUser));
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    if (!currentPassword || !newPassword) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Current password and new password are required',
      });
    }

    if (newPassword.length < 6) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'New password must be at least 6 characters' });
    }

    const user = await User.findById(req.user._id);

    if (!(await user.matchPassword(currentPassword))) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();
    res.status(HttpStatus.OK).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.isAdmin !== undefined) {
      user.isAdmin = req.body.isAdmin;
    }

    if (req.body.isActive !== undefined) {
      user.isActive = req.body.isActive;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(HttpStatus.OK).json(publicUser(updatedUser));
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
