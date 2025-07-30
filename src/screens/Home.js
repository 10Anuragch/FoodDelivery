import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodData, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/auth/foodData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
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

  return (
    <div>
      <Navbar />
      <Carousel search={search} setSearch={setSearch} />

      <div className='container mt-4'>
        {foodCat.length > 0 ? (
          foodCat.map((foodCategory) => {
            // Filter items for this category and matching search term
            const matchedItems = foodData.filter(item =>
              item.CategoryName === foodCategory.CategoryName &&
              item.name.toLowerCase().includes(search.toLowerCase())
            );

            // Only show category section if there are matched items
            if (matchedItems.length === 0) return null;

            return (
              <div className='row mb-3' key={foodCategory._id}>
                <div className='fs-3 m-3'>{foodCategory.CategoryName}</div>
                <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />

                {matchedItems.map(item => (
                  <div className='col-12 col-md-6 col-lg-4' key={item._id}>
                    <Card foodName={item.name} item={item} options={item.options[0]} ImgSrc={item.img} />
                  </div>
                ))}
              </div>
            );
          })
        ) : (
          <div>Loading categories...</div>
        )}
      </div>

      <Footer />
    </div>
  );
}
