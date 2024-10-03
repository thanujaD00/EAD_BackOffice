import React, { useState, useEffect } from "react";
import axios from "axios";
import DashBoardSidBar from "./DashBoardSideBar";
import { showErrorToast, showSuccessToast } from "./services/AlertService";
import { OrdersData } from "./orderDealer/orderDealer";
import { Button, Modal } from "react-bootstrap";

//import { useNavigate } from "react-router-dom";

const OrderManagement: React.FC = () => {
  const basePath = import.meta.env.VITE_BASE_PATH;

  //const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProductStatus, setSelectedProductStatus] = useState<string>("");
  const [activeOrderStatus, setActiveOrderStatus] = useState<string>("");
  const [oId, setOid] = useState<string>("");
  const [selectedOrderId, setSelectedOrderId] = useState<any | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<any | null>(null);


  console.log("Data : ", OrdersData);


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
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
        "https://dev-stack-backend.onrender.com/api/v1/order/getAllOrders",
        { headers }
      );

      // Set the retrieved orders in the state
      setOrders(response.data.data);
    } catch (error) {
      showErrorToast("Error fetching order data");
      console.error("Error fetching order data:", error);
    }
  };

  const handleDelete = async (orderId: string) => {
    try {
      //console.log(orderId);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `${basePath}api/orders/update-order-status/${orderId}`,
        {
          orderStatus: "Cancelled"
        },
        { headers }
      );

      if ((response.data.isSuccessful = true)) {
        showSuccessToast("Order Cancelled Successfully!");
        fetchOrders();
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  const filteredOrders = orders.filter((order: any) =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangedStatus = (order: any) => {
    setSelectedOrderId(order);
    const modal = document.getElementById("exampleModal");
    if (modal) {
      (modal as any).style.display = "block";
    }
    if (order.OrderStatus === 'Active') {
      setActiveOrderStatus("Active");
    } else if (order.OrderStatus === 'Ready') {
      setActiveOrderStatus("Ready");
    } else if (order.OrderStatus === 'Partally Deliverd') {
      setActiveOrderStatus("Partally Deliverd");
    } else if (order.OrderStatus === 'Delivered') {
      setActiveOrderStatus("Delivered");
    } else if (order.OrderStatus === 'Cancelled') {
      setActiveOrderStatus("Cancelled");
    }

  };


  const handleChangedProductStatus = (product: any, oId: any) => {
    setSelectedProductId(product);
    setOid(oId)
    const modal = document.getElementById("exampleModal1");
    if (modal) {
      (modal as any).style.display = "block";
    }
    if (product.Status === 'Active') {
      setSelectedProductStatus("Active");
    } else if (product.Status === 'Ready') {
      setSelectedProductStatus("Ready");
    }
    // } else if (product.Status === 'Partally Deliverd') {
    //   setSelectedProductStatus("Partally Deliverd");
    // } else if (product.Status === 'Delivered') {
    //   setSelectedProductStatus("Delivered");
    // } else if (product.Status === 'Cancelled') {
    //   setSelectedProductStatus("Cancelled");
    // }

  };

  const handleEditOrderStatus = async () => {
    const Id = selectedOrderId.Id;

    try {
      const data = {
        orderStatus: activeOrderStatus
      };

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `${basePath}api/orders/update-order-status/${Id}`,
        data,
        {
          headers,
        }
      );

      const modal = document.getElementById("exampleModal");
      if (modal) {
        (modal as any).style.display = "none";
      }

      if (response.status === 200) {
        showSuccessToast("Status updated");
      }

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      console.error("Error updating customer data:", error);
      alert("Error updating customer data:" + error.response.data.message);
    }
  };

  const handleEditProductStatus = async () => {
    const Id = selectedProductId.Id;
console.log("selectedProductStatus : ", selectedProductStatus);

    try {
      const data = {
        status: selectedProductStatus
      };

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `${basePath}api/orders/update-order-item-status/${oId}/items/${Id}`,
        data,
        {
          headers,
        }
      );

      const modal = document.getElementById("exampleModal");
      if (modal) {
        (modal as any).style.display = "none";
      }

      if (response.status === 200) {
        showSuccessToast("Status updated");
      }

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      console.error("Error updating customer data:", error);
      alert("Error updating customer data:" + error.response.data.message);
    }
  };

  const handleCloseModal = () => {
    setSelectedOrderId(null);
    setSelectedProductId(null);
    window.location.reload();
  };

  return (
    <div className="flex h-screen">
      <DashBoardSidBar />
      <main className="flex-1 p-5">
        <div className="flex justify-between mb-3">
          <h1 className="text-3xl font-bold">Order Management</h1>
        </div>
        <div
          className="container mx-auto mt-5"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <input
            type="text"
            placeholder="Search by Order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md mb-3"
          />
          <div className="table-responsive">
            <table className="table table-striped table-hover table-responsive-md">
              <thead className="table-dark">
                <tr>
                  <th className="fw-semibold">Customer Name</th>
                  <th className="fw-semibold">Customer Email</th>
                  <th className="fw-semibold">Total Amount</th>
                  <th className="fw-semibold">Order Status</th>
                  <th className="fw-semibold">Order Items</th>
                  <th className="fw-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {OrdersData.map(order => (
                  <tr key={order.Id}>
                    <td>{order.Customer.FirstName} {order.Customer.LastName}</td>
                    <td>{order.Customer.Email}</td>
                    <td className="text-end">Rs. {order.TotalAmount.toFixed(2)}</td>
                    <td>
                      {order.OrderStatus === "Cancelled" ? (
                        <button className="btn btn-danger">
                          {order.OrderStatus}
                        </button>
                      ) : (
                        <button className="btn btn-success">
                          {order.OrderStatus}
                        </button>
                      )}
                    </td>
                    <td>
                      <table className="table table-sm table-bordered mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Product Vendor Name</th>
                            <th>Product Status</th>
                            <th>Edit Product Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.OrderItems.map(item => (
                            <tr key={item.Id}>
                              <td>{item.Product.Name}</td>
                              <td className="text-center">{item.Quantity}</td>
                              <td>{item.Vendor.FirstName} {item.Vendor.LastName}</td>
                              <td className="text-center">
                                {item.Status === "Cancelled" ? (
                                  <button className="btn btn-outline-danger">
                                    {item.Status}
                                  </button>
                                ) : (
                                  <button className="btn btn-outline-success">
                                    {item.Status}
                                  </button>
                                )}
                              </td>
                              <td className="text-center">
                                <button className="btn btn-outline-primary btn-sm" onClick={() => handleChangedProductStatus(item, order.Id)}>
                                  <i className="bi bi-pencil-square me-1"></i>Change Status
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <button className="btn btn-outline-primary btn-sm" onClick={() => handleChangedStatus(order)} >
                          <i className="bi bi-pencil-square me-1"></i>Change Status
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(order.Id)}>
                          <i className="bi bi-trash me-1"></i>Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {selectedOrderId && (
        <Modal
          show={selectedOrderId !== null}
          onHide={handleCloseModal}
          id="exampleModal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Order Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label className="col-form-label">Status:</label>
                <select
                  className="form-select"
                  name="activeOrderStatus"
                  value={activeOrderStatus}
                  onChange={(e) => setActiveOrderStatus(e.target.value)}
                >
                  <option value="Processing">Processing</option>
                  <option value="Ready">Ready</option>
                  <option value="Partally Deliverd">Partally Deliverd</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Dispatched">Dispatched</option>
                </select>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditOrderStatus}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {selectedProductId && (
        <Modal
          show={selectedProductId !== null}
          onHide={handleCloseModal}
          id="exampleModal1"
        >
          <Modal.Header closeButton>
            <Modal.Title>Product-Order Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label className="col-form-label">Status:</label>
                <select
                  className="form-select"
                  name="selectedProductStatus"
                  value={selectedProductStatus}
                  onChange={(e) => setSelectedProductStatus(e.target.value)}
                >
                  <option value="Processing">Processing</option>
                  <option value="Ready">Ready</option>
                  {/* <option value="Partally Deliverd">Partally Deliverd</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Dispatched">Dispatched</option> */}
                </select>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditProductStatus}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default OrderManagement;
