import React, { useEffect, useState } from 'react';

import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';


export default function Home() {
  const [price, setPrice] = useState([100, 500]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);

  const [foodCat, setFoodCat] = useState([]);
  const [foodData, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/auth/foodData", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const json = await response.json();
      setFoodItems(json[0]);
      setFoodCat(json[1]);
    } catch (error) {
      console.error("Failed to load food items:", error);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);


  useEffect(() => {
    if (foodData.length > 0) {
      const result = foodData.filter(
        (item) => item.price >= price[0] && item.price <= price[1]
      );
      setFilteredFoodItems(result);
    }
  }, [price, foodData]);

  return (
    <div>
      <Navbar />
      <Carousel search={search} setSearch={setSearch} />

      {/* <div className='container mt-4'>
        <h2>Food Items</h2>


        <div className="mb-4">
          <label> Select price range (100 - 500) </label>
          <br />
          <span>
            Current Range: <b>₹{price[0]} - ₹{price[1]}</b>
          </span>

          <div className="d-flex align-items-center mt-2">
            <input
              type="range"
              className="form-range me-2"
              min={100}
              max={500}
              value={price[0]}
              onChange={(e) => setPrice([+e.target.value, price[1]])}
            />

            <input
              type="range"
              className="form-range"
              min={100}
              max={500}
              value={price[1]}
              onChange={(e) => setPrice([price[0], +e.target.value])}
            />
          </div>
        </div> */}

<div className='container mt-4'>
        <div className='row'>
          {filteredFoodItems.length > 0 ? (
            filteredFoodItems.map((item) => (

              <div key={item._id} className='col-12 col-md-6 col-lg-4'>
                <div className="card">
                  <img src={item.img} className="card-img-top" alt={item.name} />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Price: ₹{item.price}</p>
                    <p className="card-text">Category: {item.CategoryName}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center fs-4">
              No items found in this price range.
            </div>
          )}
        </div>

        {foodCat.length > 0 ? (
          foodCat.map((foodCategory) => {
            const matchedItems = foodData.filter(
              (item) =>
                (item.CategoryName === foodCategory.CategoryName &&
                  item.name.toLowerCase().includes(search.toLowerCase())) ||
                (item.price >= price[0] &&
                  item.price <= price[1])
            );

            if (matchedItems.length === 0) return null;

            return (
              <div className='row mb-3 reveal' key={foodCategory._id}>
                <div className='fs-3 m-3'>{foodCategory.CategoryName}</div>
                <hr id="hr-success" />
                {matchedItems.map((item) => (
                  <div className='col-12 col-md-6 col-lg-4' key={item._id}>
                    <Card
                      foodName={item.name}
                      item={item}
                      options={item.options[0]}
                      ImgSrc={item.img}
                    />
                  </div>
                ))}
              </div>
            );
          })
        ) : (
          <div className="text-center fs-4">Loading categories...</div>
        )}
      </div>


      <Footer />
    </div>
  );
}