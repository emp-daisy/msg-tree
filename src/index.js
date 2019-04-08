import dotenv from 'dotenv'
import app from './app';
import { connection } from './models';

dotenv.config();

const PORT = process.env.PORT || 3000;

connection().then(async () => {
  app.listen(PORT, () =>
    console.log(`Listening on port ${PORT}!`),
  );
});
