//File : AdminHome.tsx
//Author : Wickramasinghe T.D.B
//IT Number : IT21096570

import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import DashBoardSideBar from "./DashBoardSideBar";

const AdminHome: React.FC = () => {
  const roleFromStorage = localStorage.getItem("role");
  const role = roleFromStorage ? roleFromStorage.charAt(0).toUpperCase() + roleFromStorage.slice(1) : "";

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <DashBoardSideBar />

      {/* Main Content */}
      <main className="flex-1 p-5">
        <h1 className="text-3xl font-bold mb-8">Welcome to Dashboard - {role}!</h1>

        {/* Cards Section */}
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-4">
            <Card
              title="Orders"
              description="Manage and track customer orders"
              link="/orderManagement"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <Card
              title="Product Management"
              description="Add, edit, or manage all products"
              link="/paymentManagementone"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <Card
              title="Inventory"
              description="Add, edit, or manage all products"
              link="/productManagement"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <Card
              title="User Management"
              description="Manage customer information and interactions"
              link="/customerManagement"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <Card
              title="Active User Accounts"
              description="Manage customer information and interactions"
              link="/activecustomerManagement"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <Card
              title="Reviews"
              description="Manage Reviews"
              link="/reviewManagement"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

// Function to render individual cards with navigation links
const Card: React.FC<{ title: string; description: string; link: string }> = ({ title, description, link }) => (
  <Link
    to={link}
    className="card h-100 text-decoration-none shadow-sm bg-light text-dark"
    style={{
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.classList.replace('shadow-sm', 'shadow');
      e.currentTarget.classList.replace('bg-light', 'bg-primary');
      e.currentTarget.classList.replace('text-dark', 'text-white');
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.classList.replace('shadow', 'shadow-sm');
      e.currentTarget.classList.replace('bg-primary', 'bg-light');
      e.currentTarget.classList.replace('text-white', 'text-dark');
    }}
  >
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
      <div className="mt-auto">
      </div>
    </div>
  </Link>
);


export default AdminHome;
