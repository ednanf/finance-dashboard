import http from 'http';
import app from './app.js';
import databaseConnect from './utils/databaseConnect.js';
import checkEnvVars from './utils/checkEnvVars.js';

// Fail fast if env vars are missing
checkEnvVars(['PORT', 'MONGODB_URI']);

const { PORT, MONGODB_URI } = process.env;

// Assert these are defined to avoid TypeScript errors
const port: number = Number(PORT!);
const mongoUri: string = MONGODB_URI!;

const server = http.createServer(app);

const serverStart = async (): Promise<void> => {
  try {
    await databaseConnect(mongoUri);
    server.listen(port, () => {
      console.log(`[system] server is running on port ${port}...`);
    });
  } catch (error) {
    console.error('[system] errors starting the server:', error);
    process.exit(1);
  }
};

serverStart().catch((error: unknown): never => {
  console.error('[system] errors starting the server:', error);
  process.exit(1);
});
