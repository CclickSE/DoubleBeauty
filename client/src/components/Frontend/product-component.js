import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductService from "../../services/product.service";
import ProductDialogComponent from "./productDialog-component";

const ProductComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    ProductService.get()
      .then((data) => {
        setProductData(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []); // Empty dependency array

  const [productName, setproductName] = useState(null);
  const [productPrice, setproductPrice] = useState(null);
  const [productManu, setproductManu] = useState(null);
  const [productCount, setproductCount] = useState(null);

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogOpen = (product) => {
    setDialogOpen(true);
    setproductName(product.productname);
    setproductPrice(product.price);
    setproductManu(product.manufacture);
    setproductCount(product.count);
  };

  return (
    <Container style={{ width: "97%" }}>
      {!currentUser && (
        <div>
          <h1>請先登入系統，才能看到此頁面內容</h1>
          <button onClick={handleTakeToLogin}>回到登入頁面</button>
        </div>
      )}
      {!productData && (
        <div>
          <h1>目前尚無產品可選購</h1>
        </div>
      )}
      {currentUser && productData && productData.length !== 0 && (
        <div>
          <Grid
            container
            spacing={{ xs: 1, md: 1 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {productData.map((product) => {
              return (
                <Grid item xs={2} sm={4} md={4}>
                  <Card sx={{ maxWidth: "20rem" }}>
                    <CardActionArea onClick={() => handleDialogOpen(product)}>
                      <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          <p>{product.productname}</p>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <p>{product.price}</p>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions style={{justifyContent: "flex-end"}}>
                      <Button size="small" color="primary">
                        <p>add</p>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <ProductDialogComponent
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            productName={productName}
            productPrice={productPrice}
            productManu={productManu}
            productCount={productCount}
          />
          
        </div>
      )}
    </Container>
  );
};

export default ProductComponent;
