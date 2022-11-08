// Required dependencies:
import mongoose from 'mongoose';
import databaseConfig from '../database/databaseConfig';

// Database Connection Strategy:
const connectDB = async () => {
  try {
    // Pre-defined configuration for connecting to remote DB:
    const conn = await mongoose.connect(`mongodb+srv://${process.env.MONGODB_DEV_USERNAME}:${process.env.MONGODB_DEV_PASSWORD}@${process.env.MONGODB_DEV_CLUSTER_NAME}.${process.env.MONGODB_DEV_DB_IDENTIFIER}.mongodb.net/${process.env.MONGODB_DEV_DB_NAME}?retryWrites=true&w=majority`, {
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
