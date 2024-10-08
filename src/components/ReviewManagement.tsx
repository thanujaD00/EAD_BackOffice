//File : Review Managment.txs
//Author : Wickramasinghe T.D.B
//IT Number : IT21096570

import React, { useState, useEffect } from "react";
import axios from "axios";
import DashBoardSideBar from "./DashBoardSideBar";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { showErrorToast } from "./services/AlertService";

interface Review {
  _id: string;
  userid: string;
  orderid: string;
  reviewtext: string;
  rating: number;
}
interface CustomJwtPayload extends JwtPayload {
  userId?: string;
}

const ReviewManagement: React.FC = () => {
  const basePath = import.meta.env.VITE_BASE_PATH;

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");


      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }

      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      console.log("Decoded token:", decodedToken);
      const uId = decodedToken.userId

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (role === 'admin') {
        const response = await axios.get(
          `${basePath}api/vendor-ratings/all-ratings`,
          {
            headers,
          }
        );
        setReviews(response.data.Data);
      } else if (role === 'vendor') {
        const response = await axios.get(
          `${basePath}api/vendor-ratings/vendor-rating-by-id/${uId}`,
          {
            headers,
          }
        );
        setReviews(response.data.Data);
      }

    } catch (error) {
      showErrorToast("Error fetching reviews:");
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <DashBoardSideBar />
      <main className="flex-1 p-5">
        <h1 className="text-3xl font-bold mb-5">Review Management</h1>
        <div className="container mx-auto">
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">User Name</th>
                <th className="px-4 py-2">Vendor Name</th>
                <th className="px-4 py-2">Review Text</th>
                <th className="px-4 py-2">Rating</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review: any) => (
                <tr key={review._id}>
                  <td className="border px-4 py-2">
                    {review.Customer.FirstName + " " + review.Customer.LastName}
                  </td>
                  <td className="border px-4 py-2">{review.Vendor.FirstName + " " + review.Vendor.LastName}</td>
                  <td className="border px-4 py-2">{review.Comment}</td>
                  <td className="border px-4 py-2">{review.Rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ReviewManagement;
