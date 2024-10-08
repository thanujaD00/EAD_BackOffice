import "./App.css";

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import LoginPage from "./components/LoginPage";
import AdminHome from "./components/AdminHome";
import UserHome from "./components/UserHome";
import RegisterPage from "./components/RegisterPage";
import CustomerManagement from "./components/CustomerManagement";
import ActiveCustomerAcount from "./components/ActiveCustomerAcount"
import ProductManagement from "./components/ProductManagement";
import ProductManagementOne from "./components/ProductManagmentOne";
import AddNewProduct from "./components/AddNewProduct";
import EditProduct from "./components/EditProduct";
import UserProducts from "./components/UserProduct";
import UserProductView from "./components/UserProductView";
import UserCartItems from "./components/UserCartItems";
import UserOrderPage from "./components/UserOrderPage";
import AboutUs from "./components/AuboutUs";
import OrderManagement from "./components/OrderManagement";
import InquearyManagement from "./components/InquearyManagement";
import UserProfile from "./components/UserProfile";
import UserReview from "./components/UserReview";
import ReviewManagement from "./components/ReviewManagement";
import PaymentManagement from "./components/PaymentManagement";
import { ToastContainer } from "react-toastify";
import OrderReports from "./components/OrderReports";
import ResetPassword from "./components/ResetPassword";
//import OrderReports from "./components/OrderReports";

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setUser(localStorage.getItem("role") ? localStorage.getItem("role") : "");
  });

  /*
  const handleBeforeUnload = () => {
    // Clear the user data from localStorage when the browser is closed
    localStorage.removeItem("role");
  };
*/
  console.log("user : ", user);

  return (
    <>
      <NavBar />
      <ToastContainer />

      {user === "admin" ? (
        <Router>
          <Routes>
            <Route path="/adminHome" element={<AdminHome />} />
            <Route
              path="/customerManagement"
              element={<CustomerManagement />}
            />
            <Route path="/productManagement" element={<ProductManagement />} />
            <Route path="/addNewProduct" element={<AddNewProduct />} />
            <Route path="/editProduct/:productId" element={<EditProduct />} />
            <Route path="/orderManagement" element={<OrderManagement />} />
            <Route path="/inquaryManagement" element={<InquearyManagement />} />
            <Route path="/reviewManagement" element={<ReviewManagement />} />
            <Route path="/paymentManagementone" element={<ProductManagementOne />} />
            <Route path="/paymentManagement" element={<PaymentManagement />} />
            <Route path="/orderReport" element={<OrderReports />} />
            <Route path="/activecustomerManagement" element={<ActiveCustomerAcount />} />
          </Routes>
        </Router>
      ) : user === "user" ? (
        <Router>
          <Routes>
            <Route path="/userHome" element={<UserHome />} />
            <Route path="/userProducts" element={<UserProducts />} />
            <Route
              path="/productView/:productId"
              element={<UserProductView />}
            />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/cartView" element={<UserCartItems />} />
            <Route path="/orderPage" element={<UserOrderPage />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/userReview/:orderId" element={<UserReview />} />
          </Routes>
        </Router>
      ) : user === "vendor" ? (
        <Router>
          <Routes>
            <Route path="/adminHome" element={<AdminHome />} />
            <Route
              path="/customerManagement"
              element={<CustomerManagement />}
            />
            <Route path="/productManagement" element={<ProductManagement />} />
            <Route path="/addNewProduct" element={<AddNewProduct />} />
            <Route path="/editProduct/:productId" element={<EditProduct />} />
            <Route path="/orderManagement" element={<OrderManagement />} />
            <Route path="/inquaryManagement" element={<InquearyManagement />} />
            <Route path="/reviewManagement" element={<ReviewManagement />} />
            <Route path="/paymentManagementone" element={<ProductManagementOne />} />
            <Route path="/paymentManagement" element={<PaymentManagement />} />
            <Route path="/orderReport" element={<OrderReports />} />
            <Route path="/activecustomerManagement" element={<ActiveCustomerAcount />} />
          </Routes>
        </Router>
      ) : null}

      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
