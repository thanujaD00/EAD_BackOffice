import React, { useEffect, useState } from "react";
import axios from "axios";
import DashBoardSidBar from "./DashBoardSideBar";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "./services/AlertService";

type Role = 'admin' | 'user' | 'vendor' | null;


const EditProduct: React.FC = () => {
  const basePath = import.meta.env.VITE_BASE_PATH;

  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    //fetchCustomers();
    fetchProductDetails();
  }, []);

  const [productname, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [productcategory, setProductCategory] = useState("");
  const [productprice, setProductPrice] = useState("");
  const [productqty, setProductQty] = useState("");
  //const [productimage, setProductImage] = useState<File | undefined>(undefined);
  const [productstatus, setProductStatus] = useState("");
  const [role, setRole] = useState<Role>(null)

  const fetchProductDetails = async () => {
    const basePath = import.meta.env.VITE_BASE_PATH;

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
        `${basePath}api/products/get-one-product/${productId}`, // Replace with your endpoint to get product details by ID
        {
          headers,
        }
      );

      console.log(response);


      const productDetails = response.data.Data; // Assuming the response contains the product details
      // Set product details into state
      setProductName(productDetails.Name);
      setDescription(productDetails.Description);
      setProductCategory(productDetails.Category.Name);
      setProductPrice(productDetails.Price.toString());
      setProductQty(productDetails.Qty.toString());
      //  setProductImage(productDetails.productimage);
      setProductStatus(productDetails.IsActive ? "Active" : "Inactive");
    } catch (error) {
      showErrorToast("Error fetching product details");
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role") as Role;
    setRole(userRole);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (parseFloat(productprice) < 0) {
      showErrorToast("Enter Valid Price!");
      return
    }

    if (parseInt(productqty) < 0) {
      showErrorToast("Enter Valid Qty!");
      return
    }

    try {
      const formData = new FormData();
      formData.append("Name", productname);
      formData.append("Description", description);
      formData.append("Category", productcategory);
      formData.append("Price", parseFloat(productprice).toString());
      formData.append("Qty", parseInt(productqty).toString());

      if (productstatus === "Active") {
        formData.append("IsActive", "true");
      } else {
        formData.append("IsActive", "false");
      }


      const token = localStorage.getItem("token");


      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.put(
        `${basePath}api/products/update-product/${productId}`,
        formData,
        {
          headers,
        }
      );

      console.log(response);

      if ((response.data.isSuccessful = true)) {
        // console.log("Product added successfully!");
        showSuccessToast("Product Edit successfully!");

        setTimeout(() => {
          navigate("/productManagement");
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      showErrorToast("Error Edit" + error);
      console.error("Error updating product:", error);
    }
  };

  const handleCancel = () => {
    if (role === "admin") {
      navigate("/productManagement");
    } else {
      navigate("/productManagementone");
    }
  };

  return (
    <div className="flex h-screen">
      <DashBoardSidBar />
      <main className="flex-1 p-5">
        <div className="flex justify-between mb-3">
          {role === "admin" ? (
            <h1 className="text-3xl font-bold">Active / Deactive Product</h1>
          ) : (
            <h1 className="text-3xl font-bold">Edit Product Details</h1>
          )}
        </div>
        <div className="container mx-auto mt-3">
          <form>
            {role === 'vendor' ? (
              <>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name:
                  </label>
                  <input
                    type="text"
                    name="productname"
                    value={productname}
                    onChange={(e) => setProductName(e.target.value)}
                    className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Description:
                  </label>
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
                    rows={2}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Category:
                  </label>
                  <input
                    type="text"
                    name="productcategory"
                    value={productcategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
                    required
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Price:
                  </label>
                  <input
                    type="number"
                    name="productprice"
                    value={productprice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Quantity:
                  </label>
                  <input
                    type="number"
                    name="productqty"
                    value={productqty}
                    onChange={(e) => setProductQty(e.target.value)}
                    className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
                    min="0"
                    step="1"
                    required
                  />
                </div>
              </>
            ) : null}

            {role === 'admin' && (
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Product Status:
                </label>
                <select
                  name="productstatus"
                  value={productstatus}
                  onChange={(e) => setProductStatus(e.target.value)}
                  className="form-select border-gray-300 rounded-md w-full p-2 mt-1"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleSubmit}
              >
                Edit Product
              </button>
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCancel} // Implement handleCancel function
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProduct;
