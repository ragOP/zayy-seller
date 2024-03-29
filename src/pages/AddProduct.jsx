import React, { useState } from 'react';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discount: '',
    discount_type: 'percentage',
    salesprice: '',
    onsale: false,
    totalstock: '',
    instock: '',
    category: '',
    type: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send formData to an API
    console.log(formData);
  };

  return (
    <div className="container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="discount" className="form-label">Discount</label>
          <input type="number" className="form-control" id="discount" name="discount" value={formData.discount} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="discount_type" className="form-label">Discount Type</label>
          <select className="form-select" id="discount_type" name="discount_type" value={formData.discount_type} onChange={handleChange}>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="salesprice" className="form-label">Sales Price</label>
          <input type="number" className="form-control" id="salesprice" name="salesprice" value={formData.salesprice} onChange={handleChange} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="onsale" name="onsale" checked={formData.onsale} onChange={handleChange} />
          <label className="form-check-label" htmlFor="onsale">On Sale</label>
        </div>
        <div className="mb-3">
          <label htmlFor="totalstock" className="form-label">Total Stock</label>
          <input type="number" className="form-control" id="totalstock" name="totalstock" value={formData.totalstock} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="instock" className="form-label">In Stock</label>
          <input type="number" className="form-control" id="instock" name="instock" value={formData.instock} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input type="text" className="form-control" id="category" name="category" value={formData.category} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <input type="text" className="form-control" id="type" name="type" value={formData.type} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
