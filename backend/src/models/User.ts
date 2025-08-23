import mongoose, { Schema, model, HydratedDocument } from 'mongoose';
import validator from 'validator';

// User interface
export interface IUser {
  email: string;
  password: string;
  createdAt?: Date; //  Added automatically during document creation
  updatedAt?: Date; //  Added automatically during document updates
}

// User document interface
export interface IUserDocument extends IUser, HydratedDocument<IUser> {
  comparePassword(candidatePassword: string): Promise<boolean>;

  createJWT(payload?: Record<string, unknown>): Promise<string>;
}

// User schema
const userSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: [true, 'Email is already in use.'],
      validate: {
        validator(email: string) {
          return validator.isEmail(email);
        },
        message: 'Please provide a valid email address.',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters long.'],
    },
  },
  { timestamps: true },
);

/**
 * Defense against "Cannot overwrite model" errors in development.
 *
 * This pattern prevents Mongoose from trying to recompile the same model
 * multiple times during hot reloads, test runs, or when files are re-imported.
 * Without this guard, you'll get runtime errors in development environments
 * that re-execute this module (nodemon, ts-node, Jest, etc.).
 *
 * models.User checks if the model already exists before creating a new one.
 */
const User = mongoose.models.User || model<IUserDocument>('User', userSchema);

export default User;
