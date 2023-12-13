import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../../services/product.service";

const PlaceOrderComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    ProductService.getProductByName(searchInput)
      .then((data) => {
        console.log(data);
        setSearchResult(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div>這裡可以讓user下訂單喔</div>
      {!currentUser && (
        <div>
          <p>請先登入，才能瀏覽此頁面</p>
          <button onClick={handleTakeToLogin}>回到登入頁面</button>
        </div>
      )}
      {currentUser && (
        <div className="search input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={handleChangeInput}
          />
          <button onClick={handleSearch} className="btn btn-primary">
            搜尋商品
          </button>
        </div>
      )}
      {currentUser && searchResult && (
        <div>
          {searchResult.map((product) => {
            return (
              <>
              <p>這是我們從 API 返回的數據:</p>
              <div key={product._id}>
                {product.productname} <br />
                {product.price} / {product.count}
              </div>
              </>
            );
          })}

          {/* {Array.isArray(searchResult) ? (
            searchResult.map((product) => (
              <div key={product.id}>
                {product.productname} <br />
                {product.price} / {product.count}
              </div>
            ))
          ) : (
            <div>
              {searchResult.productname} <br />
              {searchResult.price} / {searchResult.count}
            </div>
          )} */}
        </div>
      )}
    </>
  );
};

export default PlaceOrderComponent;
