import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import DashBoardSideBar from "./DashBoardSideBar";

const AdminHome: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <DashBoardSideBar />

      {/* Main Content */}
      <main className="flex-1 p-5">
        <h1 className="text-3xl font-bold mb-8">Welcome to Dashboard</h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderCard(
            "Orders",
            "Manage and track customer orders",
            "/orderManagement"
          )}
          {renderCard(
            "Product Managment",
            "Add, edit, or manage all products",
            "/paymentManagementone"
          )}
          {renderCard(
            "Inventory",
            "Add, edit, or manage all products",
            "/productManagement"
          )}
          {renderCard(
            "User - Managment",
            "Manage customer information and interactions",
            "/customerManagement"
          )}
          {renderCard(
            "Active - User Acounts",
            "Manage customer information and interactions",
            "/activecustomerManagement"
          )}
          {renderCard(
            "Reports",
            "Generate and analyze sales reports",
            "/orderReport"
          )}
          {renderCard("Inquiry", "Manage Inquiries", "/inquaryManagement")}
          {renderCard("Reviews", "Manage Reviews", "/reviewManagement")}
          {renderCard("Payment", "View Payment Details", "/paymentManagement")}
        </div>
      </main>
    </div>
  );
};

// Function to render individual cards with navigation links
const renderCard = (title: string, description: string, path: string) => {
  return (
    <Link
      to={path}
      className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </Link>
  );
};

export default AdminHome;
