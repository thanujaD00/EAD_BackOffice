//File : DashBoardSideBar.tsx
//Author : Wickramasinghe T.D.B
//IT Number : IT21096570

import React from "react";
import { useNavigate } from "react-router-dom";

const DashBoardSidBar: React.FC = () => {
  const navigate = useNavigate();

  const handeCustomerManage = () => {
    navigate("/customerManagement");
  };

  const handeProductManage = () => {
    navigate("/productManagement");
  };

  const handleOrderManagement = () => {
    navigate("/orderManagement");
  };

  const handleInquearyManage = () => {
    navigate("/activecustomerManagement");
  };

  const handleReviewManage = () => {
    navigate("/reviewManagement");
  };
  
  const handleHomePage = () => {
    navigate("/adminHome");
  };

  const handeProductOneManage = () => {
    navigate("/paymentManagementone");
  }

  return (
    <>
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-64 flex-shrink-0">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="mt-2">Welcome, Admin!</p>
        </div>
        <nav className="mt-4">
          <ul>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handleHomePage}
            >
              Dashboard
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handleOrderManagement}
            >
              Orders
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handeProductManage}
            >
              Inventory
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handeProductOneManage}
            >
              Product Managment
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handeCustomerManage}
            >
              User Managment
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handleInquearyManage}
            >
              Active User Accounts
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handleReviewManage}
            >
              Reviews
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default DashBoardSidBar;
