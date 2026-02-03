
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const navigate = useNavigate();

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            navigate('/login');
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/myOrderData", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail })
            });

            if (!res.ok) {
                if (res.status === 401) {
                    alert('Session expired. Please log in again.');
                    localStorage.removeItem('token');
                    localStorage.removeItem('userEmail');
                    navigate('/login');
                }
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const response = await res.json();
            if (response && response.orderData && Array.isArray(response.orderData.order_data)) {
                setOrderData(response.orderData.order_data);
            } else {
                setOrderData([]);
            }
        } catch (error) {
            console.error("Failed to fetch order data:", error);
            alert("Failed to load your orders. Please try again.");
        }
    };

    useEffect(() => { fetchMyOrder(); }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? (
                        orderData.slice().reverse().map((orderGroup, index) => {
                            if (!Array.isArray(orderGroup)) return null;

                            const orderDateObj = orderGroup.find(entry => entry.Order_date);
                            const items = orderGroup.filter(entry => !entry.Order_date);

                            const renderedDate = orderDateObj ? (new Date(orderDateObj.Order_date)).toLocaleString() : 'Unknown';

                            return (
                                <div key={index} className='w-100 animate__animated animate__fadeInUp'>
                                    <div className='m-auto mt-5 fs-5 fw-bold'>
                                        Order Date: {renderedDate}
                                        <hr />
                                    </div>
                                    <div className='row'>
                                        {items.map((item, itemIndex) => (
                                            <div key={itemIndex} className='col-12 col-md-6 col-lg-4'>
                                                <div className="card mt-3 card-animate" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <img src={item.img} className="card-img-top" alt={item.name} style={{ height: "120px", objectFit: "cover" }} />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.name}</h5>
                                                        <div className='container w-100 p-0'>
                                                            <span className='m-1'>Qty: {item.qty}</span>
                                                            <span className='m-1'>Size: {item.size}</span>
                                                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                ₹{item.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className='fs-4 mt-5'>No Orders Found</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
