import axios from "axios";
const API_URL = "http://127.0.0.1:8080/api/product";

class ProductService {
  post(id, productname, manufacture, price, count, isNew) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      { id, productname, manufacture, price, count, isNew },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  get() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL, {
      headers: {
        Authorization: token,
      },
    });
  }

  getProductByName(productname) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/findByName/" + productname, {
        headers: {
            Authorization: token,
          },
    })
  }

  patch(id, updatedData) {
    try {
      let token;
      if (localStorage.getItem("user")) {
        token = JSON.parse(localStorage.getItem("user")).token;
      } else {
        token = "";
      }
  
      return axios.patch(API_URL + "/" + id, updatedData, {
        headers: {
          Authorization: token,
        },
      });
    } catch (e) {
      console.log("axios錯誤!!!" + e);
    }
  }
  delete(id){
    try {
      let token;
      if (localStorage.getItem("user")) {
        token = JSON.parse(localStorage.getItem("user")).token;
      } else {
        token = "";
      }
  
      return axios.delete(API_URL + "/" + id, {
        headers: {
          Authorization: token,
        },
      });
    } catch (e) {
      console.log("axios錯誤!!!" + e);
    }
  }
}

export default new ProductService();
