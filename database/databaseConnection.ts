// Required dependencies:
import mongoose from 'mongoose';
import databaseConfig from '../database/databaseConfig';

// Database Connection Strategy:
const connectDB = async () => {
  try {
    // Pre-defined configuration for connecting to remote DB:
    const conn = await mongoose.connect(databaseConfig.databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
function close(){
  return mongoose.disconnect();

}
export default {connectDB,close};
