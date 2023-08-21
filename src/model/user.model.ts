import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>({
  user: {
    type: String,
    required: true,
  },
  name: { type: String },
  roles: {
    User: {
      type: Number,
      default: 1,
    },
    Editor: Number,
    Admin: Number,
  },
  pwd: {
    type: String,
    required: true,
  },
  image: { type: String },
  sex: { type: String },
  borndate: { type: Date },
  street: { type: String },
  city: { type: String },
  country: { type: String },
  zip: { type: String },
  mod: { type: String },
  email: { type: String },
  phone: { type: String },
  courses: { type: [String] },
  refreshToken: { type: String },
});

const ROLES = {
  Admin: 2001,
  Editor: 1001,
  User: 1,
};

const User = mongoose.model<IUserDocument>("User", userSchema);

export { ROLES };
export default User;
