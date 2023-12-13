const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["employee", "admin"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//instance methods

userSchema.methods.isEmployee = function () {
  return this.role == "employee";
};

userSchema.methods.isAdmin = function () {
  return this.role == "admin";
};

userSchema.methods.comparePassword = async function (password, cb) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return cb(null, result)
  } catch (e) {
    return cb(e, result);
  }
};

// mongoose middlewares
//若使用者為新用戶，或者正在更改密碼，則將密碼進行雜湊處裡
//以下的async function不能用arrow function expression，因為會抓不到this
userSchema.pre("save", async function (next) {
  //this 代表 mongoDB 內的 document
  if (this.isNew || this.isModified("password")) {
    //將密碼進行雜湊處理
    const hashValue = await bcrypt.hash(this.password, 10);
    this.password = hashValue;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
