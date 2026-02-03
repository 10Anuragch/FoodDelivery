
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const navigate = useNavigate();
  const dispatch = useDispatchCart();
  const data = useCart() || [];

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();

  const options = props.options || {};
  const priceOptions = Object.keys(options);
  const foodItem = props.item;

  useEffect(() => {
    if (priceOptions.length > 0) {
      setSize(priceOptions[0]);
    }

  }, []);


  const finalPrice = size && options[size] ? qty * Number(options[size]) : 0;

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  const handleQty = (e) => {
    setQty(parseInt(e.target.value, 10));
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {

    const existingItem = data.find(item => item.id === foodItem._id && item.size === size);

    if (existingItem) {
      await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty, size: size, name: foodItem.name, img: props.ImgSrc });
    } else {
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: props.ImgSrc
      });
    }
  };

  return (
    <div className="animate__animated animate__fadeInUp reveal">
      <div className="card mt-3 card-animate" style={{ width: "16rem", maxHeight: "360px" }}>
        <img
          src={props.ImgSrc}
          className="card-img-top"
          alt={props.foodName}
          style={{ height: "120px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className="container w-100 p-0" style={{ height: "48px" }}>
            <select
              className="m-2 h-100 w-20 bg-success text-black rounded"
              onClick={handleClick}
              onChange={handleQty}
              value={qty}
              aria-label="Quantity"
              title="Choose quantity"
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            <select
              className="m-2 h-100 w-20 bg-success text-black rounded"
              ref={priceRef}
              onClick={handleClick}
              onChange={handleOptions}
              value={size}
              aria-label="Size"
              title="Choose size"
            >
              {priceOptions.map((sizeOption) => (
                <option key={sizeOption} value={sizeOption}>{sizeOption}</option>
              ))}
            </select>

            <div className="d-inline ms-2 h-100 w-20 fs-5" title="Price">
              ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-center ms-2 btn-animated"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
