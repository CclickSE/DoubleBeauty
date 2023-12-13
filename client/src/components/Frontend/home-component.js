import React from "react";
import {
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import Classify from "./classify-component";
import Product from "./product-component";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductService from "../../services/product.service";
import AuthService from "../../services/auth.service";

const HomeComponent = ({ currentUser, setCurrentUser }) => {
  const theme = useTheme();
  const [classify, setClassify] = React.useState("");

  const handleChange = (event) => {
    setClassify(event.target.value);
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <FormControl sx={{ m: 1, width: "30rem" }}>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">
            <p>分類篩選</p>
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={classify}
            label="classify"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          size="large"
          style={{
            textAlign: "center",
            height: "fit-content",
            width: "fit-content",
            padding: "0.25rem",
            margin: "0.25rem",
            fontSize: "1.15rem",
          }}
        >
          <p>搜尋</p>
        </Button>
      </Box>
      <Grid container spacing={0} style={{padding: "1.5rem"}}>
        <Grid item xs={3}>
          <Classify />
        </Grid>
        <Grid item xs={9}>
          <Product currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Grid>
      </Grid>
    </>
  );
};

export default HomeComponent;
