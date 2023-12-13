import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import ManufactureService from "../../services/manufacture.service";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  minHeight: "5rem",
  margin: "0.5rem",
}));

const PostManufactureComponent = ({ currentUser, setCurrentUser }) => {
  let [id, setId] = useState("");
  let [MAN_NAME, setMAN_NAME] = useState("");
  let [PHO_NUM, setPHO_NUM] = useState("");
  let [MAN_LIAISON, setMAN_LIAISON] = useState("");
  let [CITY, setCITY] = useState("");
  let [DISTRICT, setDISTRICT] = useState("");
  let [ROAD, setROAD] = useState("");
  let [NUM, setNUM] = useState("");
  let [FLOOR, setFLOOR] = useState("");
  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeId = (e) => {
    setId(e.target.value);
  };
  const handleChangeMAN_NAME = (e) => {
    setMAN_NAME(e.target.value);
  };
  const handleChangePHO_NUM = (e) => {
    setPHO_NUM(e.target.value);
  };
  const handleChangeMAN_LIAISON = (e) => {
    setMAN_LIAISON(e.target.value);
  };
  const handleChangeCITY = (e) => {
    setCITY(e.target.value);
  };
  const handleChangeDISTRICT = (e) => {
    setDISTRICT(e.target.value);
  };
  const handleChangeROAD = (e) => {
    setROAD(e.target.value);
  };
  const handleChangeNUM = (e) => {
    setNUM(e.target.value);
  };
  const handleChangeFLOOR = (e) => {
    setFLOOR(e.target.value);
  };
  const postCus = () => {
    const postData = {
      id,
      MAN_NAME,
      PHO_NUM,
      MAN_LIAISON,
      CITY,
      DISTRICT,
      ROAD,
      NUM,
      FLOOR,
    };
    ManufactureService.post(postData)
      .then(() => {
        window.alert("新廠商已創建成功");
        navigate("/CMS/manufacture");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };
  return (
    <Container style={{ margin: "3rem" }}>
      {/* {console.log(currentUser)} */}
      {!currentUser && (
        <div>
          <p>請先登入，才能瀏覽此頁面</p>
          <button onClick={handleTakeToLogin}>回到登入頁面</button>
        </div>
      )}
      {currentUser && currentUser.user.role !== "admin" && (
        <div>
          <p>只有admin可以新增廠商</p>
        </div>
      )}
      {currentUser && currentUser.user.role == "admin" && (
        <div className="form-group">
          <Grid container spacing={2}>
            <Grid item xs={4}>
            <Item>
                <label htmlFor="exampleforId">id</label>
              </Item>
              <Item>
                <label htmlFor="exampleforTitle">MAN_NAME</label>
              </Item>
              <Item>
                <label htmlFor="exampleforManufacture">PHO_NUM</label>
              </Item>
              <Item>
                <label htmlFor="exampleforCount">MAN_LIAISON</label>
              </Item>
              <Item>
                <label htmlFor="exampleforCount">CITY</label>
              </Item>
              <Item>
                <label htmlFor="exampleforCount">DISTRICT</label>
              </Item>
              <Item>
                <label htmlFor="exampleforCount">ROAD</label>
              </Item>
              <Item>
                <label htmlFor="exampleforCount">NUM</label>
              </Item>
              <Item>
                <label htmlFor="exampleforCount">FLOOR</label>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item>
                <input
                  name="id"
                  type="text"
                  className="form-control"
                  id="exampleforId"
                  onChange={handleChangeId}
                  style={{ width: "100%" }}
                />
              </Item>
              <Item>
                <textarea
                  className="form-control"
                  id="exampleforTitle"
                  // aria-describedby="emailHelp"
                  name="MAN_NAME"
                  onChange={handleChangeMAN_NAME}
                  style={{ width: "100%" }}
                />
              </Item>
              <Item>
                <textarea
                  className="form-control"
                  id="exampleforManufacture"
                  // aria-describedby="emailHelp"
                  name="PHO_NUM"
                  onChange={handleChangePHO_NUM}
                  style={{ width: "100%" }}
                />
              </Item>
              <Item>
                <textarea
                  className="form-control"
                  id="exampleforCount"
                  // aria-describedby="emailHelp"
                  name="MAN_LIAISON"
                  onChange={handleChangeMAN_LIAISON}
                  style={{ width: "100%" }}
                />
              </Item>
              <Item>
                <textarea
                  className="form-control"
                  id="exampleforCount"
                  // aria-describedby="emailHelp"
                  name="CITY"
                  onChange={handleChangeCITY}
                  style={{ width: "100%" }}
                />
              </Item>
              <Item>
                <textarea
                  className="form-control"
                  id="exampleforCount"
                  // aria-describedby="emailHelp"
                  name="DISTRICT"
                  onChange={handleChangeDISTRICT}
                  style={{ width: "100%" }}
                />
              </Item>
              <Item>
                <textarea
                  className="form-control"
                  id="exampleforCount"
                  // aria-describedby="emailHelp"
                  name="ROAD"
                  onChange={handleChangeROAD}
                  style={{ width: "100%" }}
                />
              </Item>
              <Item>
                <textarea
                  className="form-control"
                  id="exampleforCount"
                  // aria-describedby="emailHelp"
                  name="NUM"
                  onChange={handleChangeNUM}
                  style={{ width: "100%" }}
                />
              </Item>
              <Item>
                <textarea
                  className="form-control"
                  id="exampleforCount"
                  // aria-describedby="emailHelp"
                  name="FLOOR"
                  onChange={handleChangeFLOOR}
                  style={{ width: "100%" }}
                />
              </Item>
            </Grid>
          </Grid>
          <button className="btn btn-primary" onClick={postCus}>
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
  );
};

export default PostManufactureComponent;
