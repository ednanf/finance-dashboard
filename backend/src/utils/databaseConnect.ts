import mongoose from 'mongoose';
import { DatabaseError } from '../errors/index.js';

/**
 * Connects to the MongoDB database using the provided URI.
 * If the URI is missing or the connection fails, it throws a custom DatabaseError.
 * */
const databaseConnect = async (uri: string | undefined): Promise<void> => {
  if (!uri) {
    throw new DatabaseError(
      '[system] MONGODB_URI is missing. Please set it in your environment variables.',
    );
  }

  try {
    await mongoose.connect(uri);
    console.log('[system] successfully connected to MongoDB...');
  } catch (e) {
    throw new DatabaseError(
      `[system] failed to connect to MongoDB: ${e instanceof Error ? e.message : 'Unknown error'}`,
    );
  }
};

export default databaseConnect;
