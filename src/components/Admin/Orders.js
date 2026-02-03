import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteOrder = (email) => {
    axios.delete(`http://localhost:5000/api/admin/order/${email}`)
      .then(() => setOrders(orders.filter(o => o.email !== email)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Orders</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Email</th>
            <th>Order Data</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.email}>
              <td>{order.email}</td>
              <td>{JSON.stringify(order.order_data)}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteOrder(order.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
