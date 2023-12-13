const express = require("express");
const { Sequelize } = require('sequelize');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
require("./config/passport")(passport);
const authRoute = require("./routes").auth;
const employeeRoute = require("./routes").employee;
const productRoute = require("./routes").product;
const customerRoute = require("./routes").customer;
const manufactureRoute = require("./routes").manufacture;
const cors = require("cors");

//連接MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mernDB")
  .then(() => {
    console.log("連接到mongodb...");
  })
  .catch((e) => {
    console.log(e);
  });

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); //CORS 的主要目的是確保網頁應用程式的安全性


//product route 要被 jwt 保護
//如果 request header 內部沒有 jwt, 則 request 就會被視為 unauthorized

app.use("/api/user", authRoute);

// app.use(
//   "/api/product",
//   passport.authenticate("jwt", { session: false }),
//   productRoute
// );

// 定義中介軟體處理授權失敗的情況
const handleAuthFailure = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    console.log(user)
    if (!user) {
      // 在這裡處理授權失敗的情況
      return res.status(401).json({ error: "授權失敗，無法訪問該資源。", info });
      // return res.send("user有問題")
    }
    else if (err) {
      return res.send("有error")
    }
    // 如果授權成功，將用戶資訊存儲在 req.user 中
    req.user = user;
    next();
  })(req, res, next);
};

// 將自定義的中介軟體應用於授權路由
app.use("/api/employee", handleAuthFailure, employeeRoute);
app.use("/api/product", handleAuthFailure, productRoute);
app.use("/api/customer", handleAuthFailure, customerRoute);
app.use("/api/manufacture", handleAuthFailure, manufactureRoute);

// (err, user, info) => {
//   if (err) {
//     return res.status(500).send(err);
//   }
//   if (!user) {
//     if (info && info.message === "No auth token") {
//       return res.status(401).json({ message: "缺少驗證憑證" });
//     }
//     return res.status(401).json({ message: "驗證失敗" });
//   }
//   next();
// })(req, res, next);

//react預設port是3000，所以要錯開
app.listen(8080, () => {
  console.log("後端伺服器正在聆聽port8080...");
});
