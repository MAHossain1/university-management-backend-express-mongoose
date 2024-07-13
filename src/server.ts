import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(
        `Professional backend project running on port ${config.port}`,
      );
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`🧐 unhandledRejection is detected.. server shuting down..`);
  if (Server) {
    server.close(() => {
      process.exit();
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`🧐 uncaughtException is detected.. server shuting down..`);

  process.exit(1);
});
