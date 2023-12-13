import { BrowserRouter, Routes, Route } from "react-router-dom";
import { React, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import AuthService from "./services/auth.service";
import FrontendLayout from "./components/Frontend/FrontendLayout";
import HomeComponent from "./components/Frontend/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import DashboardComponent from "./components/dashboard-component";
import ProductComponent from "./components/Frontend/product-component";
import PostProductComponent from "./components/Backend/postProduct-component";
import PlaceOrderComponent from "./components/Frontend/placeOrder-component";
import BackendLayout from "./components/Backend/BackendLayout";
import ProductManageComponent from "./components/Backend/product-component";
import CustomerManageComponent from "./components/Backend/customer-component";
import UserComponent from "./components/Backend/user-component";
import ManufactureComponent from "./components/Backend/manufacture-component"

const theme = createTheme({
  palette: {
    primary: {
      main: "#2C5773",
    },
    secondary: {
      main: "#5386A6",
    },
  },
});

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/"
            element={
              <FrontendLayout
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          >
            <Route
              index
              element={
                <HomeComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path="product"
              element={
                <ProductComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path="orderHistory"
              element={
                <PlaceOrderComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path="checkout"
              element={
                <PlaceOrderComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path="postProduct"
              element={
                <PostProductComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            {/* <Route path="dashboard" element={<DashboardComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>}></Route> */}
          </Route>
        </Routes>
        <Routes>
          <Route
            path="/CMS"
            element={
              <BackendLayout
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          >
            {/* <Route index element={<BackendIndex />}></Route> */}
            <Route path="/CMS/order"></Route>
            <Route
              path="/CMS/product"
              element={
                <ProductManageComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route path="/CMS/productClassify"></Route>
            <Route
              path="/CMS/customer"
              element={
                <CustomerManageComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path="/CMS/manufacture"
              element={
                <ManufactureComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route path="/CMS/pricing"></Route>
            <Route path="/CMS/customerClassify"></Route>
            <Route
              path="/CMS/user"
              element={
                <UserComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route path="/CMS/setting" element={<RegisterComponent />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
