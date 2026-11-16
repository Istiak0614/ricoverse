// server/src/server.ts
// Entry point: connect to MongoDB, start listening, and shut down cleanly.
import type { Server } from 'node:http';
import mongoose from 'mongoose';
import app from './app';
import { config } from './config';
import { connectDB } from './config/db';

let server: Server | undefined;

const shutdown = (reason: string, exitCode: number) => {
  console.info(`${reason} — shutting down...`);
  const exit = () => {
    void mongoose.connection.close().finally(() => process.exit(exitCode));
  };
  if (server) server.close(exit);
  else exit();
};

const bootstrap = async () => {
  try {
    await connectDB();
    server = app.listen(config.port, () => {
      console.info(`RICOVERSE API listening on http://localhost:${config.port}/api/v1`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  shutdown('Unhandled rejection', 1);
});
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  shutdown('Uncaught exception', 1);
});
process.on('SIGTERM', () => shutdown('SIGTERM received', 0));
process.on('SIGINT', () => shutdown('SIGINT received', 0));

void bootstrap();
