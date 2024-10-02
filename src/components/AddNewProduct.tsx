import React, { useEffect, useState } from "react";
import axios from "axios";
import DashBoardSidBar from "./DashBoardSideBar";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "./services/AlertService";

const AddNewProduct: React.FC = () => {
  const basePath = import.meta.env.VITE_BASE_PATH;

  const navigate = useNavigate();

  const [productname, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [productcategory, setProductCategory] = useState("");
  const [productprice, setProductPrice] = useState("");
  const [productqty, setProductQty] = useState("");
  const [productimage, setProductImage] = useState<File | undefined>(undefined);
  const [category, setCategory] = useState<any[]>([]);


  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
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
        `${basePath}api/categories/get-all-category`,
        { headers }
      );

      console.log(response.data.Data);

      // Set the retrieved products in the state
      setCategory(response.data.Data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if(productname === ""){
      showErrorToast("Enter Product Name!");
      return
    }
    if(description === ""){
      showErrorToast("Enter Product Description!");
      return
    }
    if(productcategory === ""){
      showErrorToast("Enter Product Category!");
      return
    }
    if(productprice === ""){
      showErrorToast("Enter Price!");
      return
    }
    if(parseFloat(productprice) < 0){
      showErrorToast("Enter Valid Price!");
      return
    }
    if(productqty === ""){
      showErrorToast("Enter Qauntity!");
      return
    }
    if(parseInt(productqty) < 0){
      showErrorToast("Enter Valid Qty!");
      return
    }
    if(productimage === undefined){
      showErrorToast("Add Product Image!");
      return
    }

    try {
      const formData = new FormData();
      formData.append("Name", productname);
      formData.append("Description", description);
      formData.append("CategoryId", productcategory);
      formData.append("Price", parseFloat(productprice).toString());
      formData.append("Qty", parseInt(productqty).toString());
      formData.append("Image", productimage || "");

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.post(
        `${basePath}api/products/create-product`,
        formData,
        {
          headers,
        }
      );

      //console.log(response);

      if (response.status === 201) {
        showSuccessToast("Product Add Successfully");

        setTimeout(() => {
          navigate("/productManagement");
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      showErrorToast("Error adding product");
      console.error("Error adding product:", error);
    }
  };

  const handleCancel = () => {
    navigate("/productManagement");
  };

  return (
    <div className="flex h-screen">
      <DashBoardSidBar />
      <main className="flex-1 p-5">
        <div className="flex justify-between mb-3">
          <h1 className="text-3xl font-bold">Add New Product</h1>
        </div>
        <div className="container mx-auto mt-3">
          <form>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Product Name:
              </label>
              <input
                type="text"
                name="productname"
                // value={product.productname}
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
                // value={product.description}
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
              <select
                name="productcategory"
                onChange={(e) => setProductCategory(e.target.value)}
                className="form-select border-gray-300 rounded-md w-full p-2 mt-1"
                required
              >
                <option value="">Select a category</option>
                {category.map((category, index) => (
                  <option key={index} value={category.Id}>
                    {category.Name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Product Price:
              </label>
              <input
                type="number"
                name="productprice"
                // value={product.productprice}
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
                // value={product.productqty}
                onChange={(e) => setProductQty(e.target.value)}
                className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
                min="0"
                step="1"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Product Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file: any = e.target.files?.[0];
                  if (file) {
                    setProductImage(file);
                  }
                }}
                className="mt-2"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleSubmit}
              >
                Add Product
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

export default AddNewProduct;
