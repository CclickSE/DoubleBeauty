const router = require("express").Router();
const Manufacture = require("../models").manufacture;
const manufactureValidation = require("../validation").manufactureValidation;

router.use((req, res, next) => {
  console.log("manufacture route 正在接收一個request...");
  next();
});

router.get("/", async (req, res) => {
  try {
    let manufactureFound = await Manufacture.find({}).exec();
    return res.send(manufactureFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/", async (req, res) => {
  console.log("我在post了");
  let { error } = manufactureValidation(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  if (req.user.isEmployee()) {
    return res.status(400).send("只有admin可以新增廠商");
  }

  let { id, MAN_NAME, PHO_NUM, MAN_LIAISON, CITY, DISTRICT, ROAD, NUM, FLOOR } =
    req.body;

  console.log(req.body);

  try {
    let newManufacture = new Manufacture({
      id,
      MAN_NAME,
      PHO_NUM,
      MAN_LIAISON,
        CITY,
        DISTRICT,
        ROAD,
        NUM,
        FLOOR,
    });

    let savedManufacture = await newManufacture.save();
    return res.send({ msg: "此廠商已新增成功", savedManufacture });
  } catch (e) {
    return res.status(500).send("無法新增廠商");
  }
});

router.patch("/:id", async (req, res) => {
  let { error } = manufactureValidation(req.body);
  if (error) {
    return res.status(400).send(error.detail[0].message);
  }

  let { id } = req.params;
  try {
    let manufactureFound = await Manufacture.findOne({ id });
    if (!manufactureFound) {
      return res.status(400).send("找不到此廠商");
    }

    if (req.user.isEmployee()) {
      return res.status(400).send("只有admin才能修改廠商資訊");
    }

    let updatedManufacture = await Manufacture.findOneAndUpdate(
      { id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.send({
      msg: "廠商已更新成功",
      updatedManufacture,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let manufactureFound = await Manufacture.findOne({ id }).exec();
    if (!manufactureFound) {
      return res.status(400).send("找不到此廠商，無法進行刪除");
    }

    if (req.user.isEmployee()) {
      return res.status(400).send("只有admin才可以刪除廠商資料");
    }

    await Manufacture.deleteOne({ id }).exec();

    return res.send({
      msg: "廠商已被刪除",
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
