//File : Product Inventory.tsx
//Author : Wickramasinghe T.D.B
//IT Number : IT21096570

import React, { useState, useEffect } from "react";
import axios from "axios";
import DashBoardSidBar from "./DashBoardSideBar";
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "./services/AlertService";

const ProductManagement: React.FC = () => {
  const basePath = import.meta.env.VITE_BASE_PATH;

  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100; // Set your desired max length for the description

  // Function to toggle expanded state
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `${basePath}api/products/get-all-products`,
        { headers }
      );

      console.log(response.data.Data);
      setProducts(response.data.Data);

      const emailProduct = response.data.Data;

      const shouldSendEmail = (productId: string) => {
        const lastSent = localStorage.getItem(`lastEmailSent_${productId}`);
        if (!lastSent) return true;

        const lastSentDate = new Date(parseInt(lastSent));
        const now = new Date();
        const hoursSinceLastEmail = (now.getTime() - lastSentDate.getTime()) / (1000 * 60 * 60);

        return hoursSinceLastEmail >= 24;
      };

      // const sendLowStockEmail = (product: any) => {
      //   const templateParams = {
      //     to_name: product.Vendor.FirstName,
      //     p_name: product.Name,
      //     p_units: product.Qty,
      //     send_mail: "thanujadha20@gmail.com"
      //     // send_mail: product.Vendor.Email
      //   };

      //   emailjs.send(
      //     'service_8relxas',
      //     'template_p347l2o',
      //     templateParams,
      //     'nJZ8AUZgP7APdlpQW'
      //   )
      //     .then((response) => {
      //       console.log('Email sent successfully to vendor:', response);
      //       localStorage.setItem(`lastEmailSent_${product.Id}`, Date.now().toString());
      //     })
      //     .catch((error) => {
      //       console.error('Error sending email to vendor:', error);
      //     });
      // }

      emailProduct.forEach((product: any) => {
        if (product.Qty < 10 && shouldSendEmail(product.Id)) {
          // sendLowStockEmail(product);
        }
      });

    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // const handleAddNewProduct = () => {
  //   navigate("/addNewProduct");
  // };

  // Handle editing a product
  const handleEdit = (product: any) => {
    navigate(`/editProduct/${product.Id}`);
  };

  const handleDelete = async (productId: string) => {
    try {
      console.log(productId);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(
        `https://dev-stack-backend.onrender.com/api/v1/product/deleteProduct/${productId}`,
        { headers }
      );

      if ((response.data.isSuccessful = true)) {
        showSuccessToast("Product Successfully Deleted");

        setTimeout(() => {
          fetchProducts();
        }, 2000);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const filteredProducts = products.filter((product: any) =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <DashBoardSidBar />
      <main className="flex-1 p-5">
        <div className="flex justify-between mb-3">
          <h1 className="text-3xl font-bold">Product Inventory</h1>
        </div>
        <div className="container mx-auto mt-5">
          <input
            type="text"
            placeholder="Search by Product Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control mb-3"
          />
          <table className="table table-striped table-bordered table-hover">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Vendor</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Update</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product: any) => (
                <tr key={product.productId}>
                  <td>{product.Name}</td>
                  <td>
                    {isExpanded
                      ? product.Description
                      : product.Description.length > maxLength
                        ? product.Description.substring(0, maxLength) + '...'
                        : product.Description
                    }
                    {product.Description.length > maxLength && (
                      <button
                        onClick={toggleDescription}
                        className="btn btn-outline-info p-1 ms-1 m-3"
                      >
                        {isExpanded ? 'Read Less' : 'Read More'}
                      </button>
                    )}
                  </td>
                  <td>{product.Category.Name}</td>
                  <td>{product.Vendor.FirstName}</td>
                  <td>{product.Price}</td>
                  <td>
                    <img
                      className="img-fluid"
                      src={product.ImageUrl}
                      alt="Product"
                    />
                  </td>
                  <td className="text-center">
                    <div className="d-flex flex-column align-items-center">
                      <span>{product.Qty}</span>
                      {product.Qty < 10 && (
                        <span className="badge bg-danger mt-1">Low Stock!</span>
                      )}
                    </div>
                  </td>
                  <td>{
                    product.IsActive ? (
                      <button className="btn btn-outline-success">Active</button>
                    ) : (
                      <button className="btn btn-outline-warning">Inactive</button>
                    )
                  }
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(product)}
                    >
                      Edit Pro.
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(product._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ProductManagement;
