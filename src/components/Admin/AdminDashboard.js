import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Orders from "./Orders";
import Users from "./Users";
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <ul>
          <li><Link to="/admin/orders">Orders</Link></li>
          <li><Link to="/admin/users">Users</Link></li>
        </ul>
      </nav>

      <div className="admin-content">
        <Routes>
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
