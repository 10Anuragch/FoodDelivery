import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const res = await fetch("http://localhost:5000/api/auth/myOrderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail')
      })
    });

    const response = await res.json();

    // Safely extract and set order_data
    if (response && response.orderData && Array.isArray(response.orderData.order_data)) {
      setOrderData(response.orderData.order_data);
    } else {
      setOrderData([]);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className='container'>
        <div className='row'>
          {
            orderData.length > 0 ? (
              orderData.slice().reverse().map((orderGroup, index) => {
                if (!Array.isArray(orderGroup)) return null;

                const orderDateObj = orderGroup.find(entry => entry.Order_date);
                const items = orderGroup.filter(entry => !entry.Order_date);

                return (
                  <div key={index} className='w-100'>
                    <div className='m-auto mt-5 fs-5 fw-bold'>
                      Order Date: {orderDateObj ? new Date(orderDateObj.Order_date).toLocaleString() : 'Unknown'}
                      <hr />
                    </div>

                    <div className='row'>
                      {
                        items.map((item, itemIndex) => (
                          <div key={itemIndex} className='col-12 col-md-6 col-lg-4'>
                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                              <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
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
                        ))
                      }
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='fs-4 mt-5'>No Orders Found</div>
            )
          }
        </div>
      </div>

      <Footer />
    </div>
  );
}
