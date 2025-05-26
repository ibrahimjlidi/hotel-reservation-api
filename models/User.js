import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  etat: { type: String },
  isAdmin: { type: Boolean, default: false },
  age: { type: Number },
  post: { type: String },
}, { timestamps: true });


userSchema.pre("validate", function (next) {
  if (this.isAdmin) {
    if (!this.post) {
      this.invalidate("post", "Post is required for admin users.");
    }
    this.age = undefined; // clear age if admin
  } else {
    if (this.age === undefined || this.age === null) {
      this.invalidate("age", "Age is required for non-admin users.");
    }
    this.post = undefined; // clear post if not admin
  }
  next();
});

// Password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
