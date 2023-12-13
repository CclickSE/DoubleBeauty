const router = require("express").Router();
const Customer = require("../models").customer;
const customerValidation = require("../validation").customerValidation;

router.use((req, res, next) => {
  console.log("customer route 正在接收一個 request");
  next();
});

router.get("/", async (req, res) => {
  try {
    let customerFound = await Customer.find({}).exec();
    console.log(customerFound);
    return res.send(customerFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/", async (req, res) => {
  let { error } = customerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  if (req.user.isEmployee()) {
    return res.status(400).send("只有admin才能新增客戶");
  }

  let {
    id,
    CUS_NAME,
    PHO_NUM,
    LEVEL,
    CUS_LIAISON,
    UIN,
    CITY,
    DISTRICT,
    ROAD,
    NUM,
    FLOOR,
    isNew,
  } = req.body;

  try {
    let newCustomer = new Customer({
      id,
      CUS_NAME,
      PHO_NUM,
      LEVEL,
      CUS_LIAISON,
      UIN,
      CITY,
      DISTRICT,
      ROAD,
      NUM,
      FLOOR,
      isNew,
    });

    let savedCustomer = await newCustomer.save();
    return res.send({
      msg: "此客戶已新增成功",
      savedCustomer,
    });
  } catch (e) {
    return res.status(500).send("無法新增客戶");
    S;
  }
});

router.patch("/:id", async (req, res) => {
  let { error } = customerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let { id } = req.params;
  try {
    let customerFound = await Customer.findOne({ id });
    if (!customerFound) {
      return res.status(400).send("找不到此客戶，無法進行更新");
    }

    if (req.user.isEmployee()) {
      return res.status(400).send("只有admin才能更新客戶數據");
    }

    let updateCustomer = await Customer.findOneAndUpdate({ id }, req.body, {
      new: true,
      runValidators: true,
    });

    return res.send({
      msg: "客戶已更新成功",
      updateCustomer,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let customerFound = await Customer.findOne({ id }).exec();
    if (!customerFound) {
      // console.log(id)
      return res.status(400).send("找不到此客戶，無法進行刪除");
    }

    if (req.user.isEmployee()) {
      return res.status(400).send("只有admin才能刪除客戶");
    }

    await Customer.deleteOne({ id }).exec();

    return res.send({
      msg: "客戶已被刪除",
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete("/deleteAll", async (req, res) => {
  await Customer.deleteMany({}, (err) => {
    if (err) {
      return res.status(500).send(err); // 如果出现错误，返回服务器错误状态和错误信息
    } else {
      return res.send("已刪除所有資料"); // 成功时返回成功消息
    }
  });
});

module.exports = router;
