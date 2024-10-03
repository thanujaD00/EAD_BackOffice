import React, { useState, useEffect } from "react";
import axios from "axios";
import DashBoardSidBar from "./DashBoardSideBar";
import { showErrorToast, showSuccessToast } from "./services/AlertService";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";

const ActiveCustomerAcount: React.FC = () => {
    const basePath = import.meta.env.VITE_BASE_PATH;

    const [customers, setCustomers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
    const [activeStatus, setActiveStatus] = useState("")

    useEffect(() => {

        fetchCustomers();

    }, []);

    const fetchCustomers = async () => {
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
                `${basePath}api/users/get-all-users`,
                {
                    headers,
                }
            );
            showSuccessToast("Success Loading Customer Data");
            console.log(response.data.Data);

            setCustomers(response.data.Data);
        } catch (error) {
            showErrorToast("Error fetching customer data");
            console.error("Error fetching customer data:", error);
        }
    };


    const handleEdit = (customer: any) => {
        setSelectedCustomer(customer);
        const modal = document.getElementById("exampleModal");
        if (modal) {
            (modal as any).style.display = "block";
        }
        setActiveStatus(customer.Status === 'active' ? "Active" : "Pending")

    };

    console.log("DDD ", selectedCustomer);



    const handleCloseModal = () => {
        setSelectedCustomer(null);
        window.location.reload();
    };

    const handleEditCustomer = async () => {
        const userId = selectedCustomer.id;
        let a
        if (activeStatus === "Active") {
            a = "active"
        } else {
            a = "pending"
        }

        try {
            const updatedCustomerData = {
                Status: a
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
                `${basePath}api/users/update-status/${userId}`,
                updatedCustomerData,
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

    const filteredCustomers = customers.filter((customer: any) =>
        customer.FirstName.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <div className="flex h-screen">
            <DashBoardSidBar />
            <main className="flex-1 p-5">
                <div className="flex justify-between mb-3">
                    <h1 className="text-3xl font-bold">Active User Account</h1>
                </div>
                <div
                    className="container mx-auto mt-5"
                    style={{ maxHeight: "500px", overflowY: "auto" }}
                >
                    <input
                        type="text"
                        placeholder="Search by First Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md mb-3"
                    />
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Role</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.filter((customer: any) => customer.Role === 'user').map((customer: any) => (
                                <tr key={customer.id}>
                                    <td className="border px-4 py-2">
                                        {customer.FirstName} {customer.Lastname}
                                    </td>
                                    <td className="border px-4 py-2">{customer.Email}</td>
                                    <td className="border px-4 py-2">{customer.Role}</td>
                                    <td className="border px-4 py-2">{customer.Status}</td>
                                    <td className="text-center">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleEdit(customer)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            {selectedCustomer && (
                <Modal
                    show={selectedCustomer !== null}
                    onHide={handleCloseModal}
                    id="exampleModal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Active/Deactive Customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-3">
                                <label className="col-form-label">Status:</label>
                                <select
                                    className="form-select"
                                    name="activeStatus"
                                    value={activeStatus}
                                    onChange={(e) => setActiveStatus(e.target.value)}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleEditCustomer}>
                            Save changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default ActiveCustomerAcount;
