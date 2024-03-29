import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Paper,
  ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles"; // Import createTheme to create a theme object

// Define your custom theme
const theme = createTheme();

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    discount_type: "percentage",
    salesprice: "",
    onsale: false,
    totalstock: "",
    instock: "",
    category: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      // Call the API to register the seller
      const response = await fetch(
        "https://zayy-backend.onrender.com/api/seller/addProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Registration successful, redirect to login page or dashboard
        alert("added");
      } else {
        // Registration failed, handle the error
        const errorMessage = await response.text();
        throw new Error(errorMessage);
        // You may also handle the response body for more detailed error messages
      }
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration error
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <StyledPaper>
        <Typography variant="h5" gutterBottom>
          Add Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                fullWidth
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Discount"
                fullWidth
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                label="Discount Type"
                fullWidth
                name="discount_type"
                value={formData.discount_type}
                onChange={handleChange}
              >
                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="fixed">Fixed</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Sales Price"
                fullWidth
                type="number"
                name="salesprice"
                value={formData.salesprice}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.onsale}
                    onChange={handleChange}
                    name="onsale"
                  />
                }
                label="On Sale"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Total Stock"
                fullWidth
                type="number"
                name="totalstock"
                value={formData.totalstock}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="In Stock"
                fullWidth
                type="number"
                name="instock"
                value={formData.instock}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                fullWidth
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Type"
                fullWidth
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </ThemeProvider>
  );
};

export default AddProduct;
