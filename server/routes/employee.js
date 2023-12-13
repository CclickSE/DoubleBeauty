const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").user;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("正在接收一個跟employee有關的請求...");
  next();
});

router.get("/getAllUsers", async (req, res) => {
  // if (req.user.isEmployee()) {
  //   return res.status(400).send("只有admin才能查看所有user");
  // }
  try {
    const allUsers = await User.find();
    return res.send(allUsers);
  } catch (e) {
    return res.status(500).send("無法獲取使用者列表...");
  }
});

router.post("/register", async (req, res) => {
  //確認數據是否符合規範
  let { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //確認信箱是否被註冊過
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("此信箱已被註冊過");
  }

  //製作新user
  let { email, username, password, role } = req.body;
  let newUser = new User({ email, username, password, role });
  try {
    let savedUser = await newUser.save();
    return res.send({
      msg: "使用者成功儲存",
      savedUser,
    });
  } catch (e) {
    return res.status(500).send("無法儲存使用者...");
  }
});

router.patch("/:email", async (req, res) => {
  let { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let { email } = req.params;

  try {
    let userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).send("找不到此Employee，無法進行更新");
    }

    if (req.user.isEmployee()) {
      return res.status(400).send("只有admin才能更新Employee數據");
    }

    let updateUser = await User.findOneAndUpdate({ email }, req.body, {
      new: true,
      runValidators: true,
    });

    return res.send({
      msg: "Employee已更新成功",
      updateUser,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete("/:email", async (req, res) => {
  let { email } = req.params;
  try {
    let UserFound = await User.findOne({ email }).exec();
    if (!UserFound) {
      return res.status(400).send("找不到此Employee");
    }

    console.log(UserFound);

    console.log(req.user);
    console.log(req);

    if (req.user.isEmployee()) {
      return res.status(400).send("只有admin才能刪除Employee");
    }

    //應該是下面這裏有問題
    await User.deleteOne({ email }).exec();
    console.log("我在這!");
    return res.send({
      msg: "Employee已被刪除",
    });
  } catch (e) {
    console.error("刪除user時出錯：", e);
    return res.status(500).send(e);
  }
});

module.exports = router;
