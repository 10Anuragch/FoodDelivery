import React, { useRef } from "react";
import Delete from "@mui/icons-material/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import "../App.css";

export default function Cart({ onClose }) {
  const data = useCart() || [];
  const dispatch = useDispatchCart();
  const boxRef = useRef(null);


  const handleOverlayClick = (e) => {
    if (boxRef.current && !boxRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Checkout handler
  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("You must be logged in to place an order.");
      if (onClose) onClose();
      return;
    }

    alert("Order Placed Successfully!");
    try {
      const response = await fetch("http://localhost:5000/api/auth/orderData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });

      if (response.status === 200) {
        dispatch({ type: "DROP" });
        if (onClose) onClose();
      } else {
        alert("Failed to place order. Try again.");
      }
    } catch (err) {
      alert("Network error while placing order.");
    }
  };

  const totalPrice = data.reduce(
    (total, food) => total + Number(food.price || 0),
    0
  );

  return (
    <div className="cart-overlay" onClick={handleOverlayClick}>
      <div ref={boxRef} className="cart-box animate__animated animate__fadeInUp">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fs-3 fw-bold">
            {data.length === 0 ? "Cart" : "Your Cart"}
          </h2>
          <button className="btn btn-success" onClick={onClose}>
            ✕
          </button>
        </div>


        {data.length === 0 ? (
          <div className="text-center py-5">
            <h3 className="fs-4 mb-3">The Cart is Empty!</h3>
            <button className="btn btn-success" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>

            <div className="table-responsive">
              <table className="table table-hover text-white">
                <thead className="text-success fs-5">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Option</th>
                    <th>Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((food, index) => (
                    <tr key={`${food.id}-${index}`}>
                      <td>{index + 1}</td>
                      <td>{food.name}</td>
                      <td>{food.qty}</td>
                      <td>{food.size}</td>
                      <td>{food.price}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => dispatch({ type: "REMOVE", index })}
                        >
                          <Delete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


            <div className="d-flex justify-content-between align-items-center mt-4">
              <h1 className="fs-4 fw-semibold">Total Price: {totalPrice}/-</h1>
              <button className="btn btn-success" onClick={handleCheckOut}>
                Check Out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
