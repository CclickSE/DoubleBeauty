import axios from "axios";
const API_URL = "http://127.0.0.1:8080/api/employee";

class EmployeeService {
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      //會return Promise
      username,
      email,
      password,
      role,
    });
  }

  getAllUsers() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/getAllUsers", {
      headers: {
        Authorization: token,
      },
    });
  }

  patch(email) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    //   console.log(token)
    } else {
      token = "";
    }
    return axios.patch(API_URL + "/" + email, {
      headers: {
        Authorization: token,
      },
    });
  }

  delete(email) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "/" + email, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new EmployeeService();
