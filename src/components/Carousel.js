
import React from 'react';
import img1 from '../Images/img1.jpg';
import img2 from '../Images/img2.jpg';
import img3 from '../Images/img3.jpg';

export default function Carousel({ search, setSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="3000"
        style={{ maxHeight: '600px', overflow: 'hidden', paddingTop: '100px' }}
      >

       
        <div
          className="carousel-caption d-flex justify-content-center align-items-center animate__animated animate__fadeInDown"
          style={{
            zIndex: 2,
            bottom: '10%',
            top: 'auto',
          }}
        >
          <form className="d-flex w-75 justify-content-center" onSubmit={handleSubmit}>
            <input
              className="form-control me-2 bg-white text-dark text-center"
              type="search"
              placeholder="Search your food..."
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-success text-white btn-animated" type="submit">
              Search
            </button>
          </form>
        </div>

       
        <div className="carousel-inner" id="carousel">
          <div className="carousel-item active" data-bs-interval="3000">
            <img
              src={img1}
              className="d-block w-100"
              style={{
                height: '500px',
                objectFit: 'cover',
                filter: 'brightness(45%)',
                transition: 'transform .8s ease'
              }}
              alt="Slide 1"
            />
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img
              src={img2}
              className="d-block w-100"
              style={{
                height: '500px',
                objectFit: 'cover',
                filter: 'brightness(45%)',
                transition: 'transform .8s ease'
              }}
              alt="Slide 2"
            />
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img
              src={img3}
              className="d-block w-100"
              style={{
                height: '500px',
                objectFit: 'cover',
                filter: 'brightness(45%)',
                transition: 'transform .8s ease'
              }}
              alt="Slide 3"
            />
          </div>
        </div>

       
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
