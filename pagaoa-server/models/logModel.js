import mongoose from 'mongoose';

const logSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      enum: ['info', 'warn', 'error'],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Log = mongoose.model('Log', logSchema);

export default Log;
