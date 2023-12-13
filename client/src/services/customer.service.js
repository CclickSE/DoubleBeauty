import axios from "axios";
const API_URL = "http://127.0.0.1:8080/api/customer";

class CustomerService {
  post({
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
  }) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      {
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
      },
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

  patch(CUS_ID, updatedData) {
    try {
      let token;
      if (localStorage.getItem("user")) {
        token = JSON.parse(localStorage.getItem("user")).token;
      } else {
        token = "";
      }

      return axios.patch(API_URL + "/" + CUS_ID, updatedData, {
        headers: {
          Authorization: token,
        },
      });
    } catch (e) {
      console.log("axios錯誤：" + e);
    }
  }

  delete(id) {
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
      console.log("axios錯誤：" + e);
    }
  }

  deleteAll() {
    try {
      let token;
      if (localStorage.getItem("user")) {
        token = JSON.parse(localStorage.getItem("user")).token;
      } else {
        token = "";
      }

      return axios.delete(API_URL + "/deleteAll", {
        headers: {
          Authorization: token,
        },
      });
    } catch (e) {
      console.log("axios錯誤：" + e);
    }
  }
}

export default new CustomerService();
