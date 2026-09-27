import Log from '../models/logModel.js';
import { HttpStatus } from '../config/constants.js';

export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find({}).sort({ createdAt: -1 }).limit(50);
    res.status(HttpStatus.OK).json(logs);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
