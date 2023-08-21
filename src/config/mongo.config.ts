import mongoose, { ConnectOptions } from "mongoose";
import { MONGODB_URI } from "../env";

const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

export default connectDatabase;
