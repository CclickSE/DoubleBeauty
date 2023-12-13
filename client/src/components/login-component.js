import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { TextField, Box, Container, Button, Alert } from "@mui/material";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      let response = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data)); //存成功登入訊息、token、foundUser
      window.alert("登入成功。您現在將被重新導向到首頁。");
      setCurrentUser(AuthService.getCurrentUser());
      navigate("/");
    } catch (e) {
      setMessage(e.response.data);
    }
  };

  return (
    <Container
      className="container"
      maxWidth="100%" // 設置最大寬度為 100%
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh", // 讓容器至少撐滿整個視窗高度
        textAlign: "center",
        fontSize: "32pt",
      }}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25rem" },
          display: "flex",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
      >
        
        {message && <Alert severity="error">{message}</Alert>}
        {/* message default 是falsy value，唯有抓到錯誤訊行才會顯示此行 */}
        {/* <div><img src="../../public/logo.png" alt="" /></div> */}
        <p style={{ margin: "1.25rem" }}>雙美牙科材料行</p>
        <TextField
          required
          id="standard-required"
          label="email"
          type="email"
          onChange={handleEmail}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={handlePassword}
        />
        <Button variant="contained" onClick={handleLogin}>
          登入系統
        </Button>
      </Box>
    </Container>
  );
};

export default LoginComponent;
