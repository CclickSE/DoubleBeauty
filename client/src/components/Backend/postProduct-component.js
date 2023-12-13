import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from '../../services/product.service';
import { Container } from "@mui/material";

const PostProductComponent = ({ currentUser, setCurrentUser }) => {
    let [id, setId] = useState("");
    let [productname, setProductname] = useState("");
    let [manufacture, setManufacture] = useState("");
    let [price, setPrice] = useState(1);
    let [count, setCount] = useState("");
    let [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleTakeToLogin = () => {
      navigate("/login");
    };
    const handleChangeId = (e) => {
      setId(e.target.value);
      };
    const handleChangeProductname = (e) => {
        setProductname(e.target.value);
      };
    const handleChangeManufacture = (e) => {
        setManufacture(e.target.value);
      };
    const handleChangePrice = (e) => {
        setPrice(e.target.value);
      };
    const handleChangeCount = (e) => {
        setCount(e.target.value);
      };
      const postProduct = () => {
        ProductService.post(id, productname, manufacture, price, count)
          .then(() => {
            window.alert("新商品已創建成功");
            navigate("/product");
          })
          .catch((error) => {
            console.log(error.response);
            setMessage(error.response.data);
          });
      };
  return (
    <Container>
    {!currentUser && (
        <div>
          <p>請先登入，才能瀏覽此頁面</p>
          <button onClick={handleTakeToLogin}>回到登入頁面</button>
        </div>
      )}
      {currentUser && currentUser.user.role !== "admin" && (
        <div>
          <p>只有admin可以新增商品</p>
        </div>
      )}
      {currentUser && currentUser.user.role == "admin" && (
        <div className="form-group">
          <label htmlFor="exampleforId">商品ID：</label>
          <input
            name="id"
            type="text"
            className="form-control"
            id="exampleforId"
            onChange={handleChangeId}
          />
          <br />
          <label htmlFor="exampleforTitle">商品名稱：</label>
          <textarea
            className="form-control"
            id="exampleforTitle"
            // aria-describedby="emailHelp"
            name="productname"
            onChange={handleChangeProductname}
          />
          <br />
          <label htmlFor="exampleforManufacture">製造商：</label>
          <textarea
            className="form-control"
            id="exampleforManufacture"
            // aria-describedby="emailHelp"
            name="manufacture"
            onChange={handleChangeManufacture}
          />
          <br />
          <label htmlFor="exampleforPrice">價格：</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={handleChangePrice}
          />
          <br />
          <label htmlFor="exampleforCount">單位：</label>
          <textarea
            className="form-control"
            id="exampleforCount"
            // aria-describedby="emailHelp"
            name="count"
            onChange={handleChangeCount}
          />
          <br />
          <button className="btn btn-primary" onClick={postProduct}>
            交出表單
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </Container>
  )
}

export default PostProductComponent