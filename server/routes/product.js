const router = require("express").Router();
const Product = require("../models").product;
const productValidation = require("../validation").productValidation;

router.use((req, res, next) => {
  console.log("product route 正在接收一個 request...");
  next();
});

router.get("/", async (req, res) => {
  try {
    //populate前面要是query object(thenable object)
    let productFound = await Product.find({})
      .populate("admin", ["username", "email"])
      .exec();
    return res.send(productFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//用product name 尋找
router.get("/findByName/:productname", async (req, res) => {
  let { productname } = req.params;
  try {
    let productFound = await Product.find({ productname: productname })
      .populate("admin", ["username", "email"])
      .exec();
    return res.send(productFound);
  } catch (e) {
    return res.status(500).send("查無此商品");
  }
});

//用product id 尋找
router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let productFound = await Product.findOne({ _id })
      .populate("admin", ["username", "email"])
      .exec();
    return res.send(productFound);
  } catch (e) {
    return res.status(500).send("查無此商品");
  }
});

//新增商品
router.post("/", async (req, res) => {
  //認證數據符合規範
  //   console.log(req.body);
  let { error } = productValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // console.log(req.body)

  if (req.user.isEmployee()) {
    return res.status(400).send("只有admin才能新增商品");
  }

  let { id, productname, manufacture, price, count, isNew } = req.body;
  //   console.log(req.user._id)
  try {
    let newProduct = new Product({
      id,
      productname,
      manufacture,
      price,
      count,
      isNew,
      admin: req.user._id,
    });
    let savedProduct = await newProduct.save();
    return res.send({
      msg: "此商品已新增成功",
      savedProduct, 
    });
  } catch (e) {
    return res.status(500).send("無法新增商品");
  }
});

//更改商品
router.patch("/:id", async (req, res) => {
  //驗證數據符合規範
  // console.log(req)
  // console.log("我要開始驗證了" + req.body)
  let { error } = productValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let { id } = req.params;
  //確認商品存在
  try {
    let productFound = await Product.findOne({ id });
    if (!productFound) {
      return res.status(400).send("找不到此產品，無法進行更新");
    }

    //必須是admin才能編輯商品
    // if(productFound.admin.equals(request.user._id)) {} 不會用到此function
    if (req.user.isEmployee()) {
      return res.status(400).send("只有admin才能更新商品");
    }

    let updateProduct = await Product.findOneAndUpdate({ id }, req.body, {
      new: true,
      runValidators: true,
    });

    return res.send({
      msg: "商品已更新成功",
      updateProduct,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

//刪除產品
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  //確認商品存在
  try {
    let productFound = await Product.findOne({ id }).exec(); //停在這行
    if (!productFound) {
      return res.status(400).send("找不到此產品，無法進行刪除");
    }

    console.log(req.user)

    //必須是admin才能刪除商品
    // if(productFound.admin.equals(request.user._id)) {} 不會用到此function
    if (req.user.isEmployee()) {
      return res.status(400).send("只有admin才能刪除商品");
    }

    await Product.deleteOne({ id }).exec();

    return res.send({
      msg: "商品已被刪除",
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
