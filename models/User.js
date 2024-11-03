const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        const transformed = {
          id: ret._id,
          username: ret.username,
          email: ret.email,
          phone: ret.phone,
          address: ret.address,
        };

        delete ret.password;
        delete ret.__v;
        return transformed;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
