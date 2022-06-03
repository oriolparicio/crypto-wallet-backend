import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
});

// Compare if the password is the same
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  console.log(candidatePassword, userPassword);
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('user', userSchema);

export const schema = User.schema;

export default User;
