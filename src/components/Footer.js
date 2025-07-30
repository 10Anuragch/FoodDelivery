import React from 'react';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer className="bg-light text-dark border-top py-3 mt-4">
      <div className="container d-flex flex-wrap justify-content-between align-items-center">
        <p className="mb-0">© 2025 GoFood, Inc</p>
        
        {/* You can replace the below with a real logo or remove it */}
        <Link to="/" className="text-dark text-decoration-none d-flex align-items-center">
          {/* <strong className="fs-5">YourLogo</strong> */}
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
