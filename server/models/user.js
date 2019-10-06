const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: isEmail,
        message: "{VALUE} is not a valid email"
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true
    },
    token: {
      type: String
    }
  },
  {
    toJSON: {
      transform: (doc, { _id, name, email }) => ({ _id, name, email })
    }
  }
);

UserSchema.methods.generateAuthToken = async function () {
  if (this.token) return this.token;

  this.token = jwt
    .sign(
      {
        _id: this._id.toHexString()
      },
      process.env.JWT_SECRET
    )
    .toString();

  await this.save();

  return this.token;
};

UserSchema.statics.findByToken = async function (token) {
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    return this.findOne({ _id, token });
  } catch (error) {
    throw error;
  }
};

UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw {
      errors: {
        email: {
          message: "User not found."
        }
      }
    };
  } else {
    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      return user;
    } else {
      throw {
        errors: {
          password: {
            message: "Incorrect password"
          }
        }
      };
    }
  }
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 8);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model("User", UserSchema);
