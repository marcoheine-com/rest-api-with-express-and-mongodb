import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.findByLogin = async (login) => {
  let user = await this.findeOne({
    username: login,
  });

  if (!user) {
    user = await this.findeOne({ email: login });
  }

  return user;
};

userSchema.pre('remove', (next) => {
  this.model('Message').deleteMany({ user: this._id }, next);
});

const User = mongoose.model('User', userSchema);

export default User;
