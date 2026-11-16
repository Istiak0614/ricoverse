// server/src/config/db.ts
import mongoose from 'mongoose';
import { config } from './index';

export const connectDB = async (): Promise<void> => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(config.databaseUrl);
  console.info(`MongoDB connected: ${mongoose.connection.name}`);
};

export const getDBStatus = (): string => {
  const states: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return states[mongoose.connection.readyState] ?? 'unknown';
};
