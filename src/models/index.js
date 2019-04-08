import mongoose from 'mongoose';

import Contact from './contact';
import Message from './message';

const connection = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
};

const models = { Contact, Message };

export { connection };

export default models;