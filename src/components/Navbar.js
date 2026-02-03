
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from './ContextReducer';
import Modal from './Modal';
import Cart from '../screens/Cart.js';

export default function Navbar() {
    const [cartView, setCartView] = useState(false);
    const items = useCart() || [];
    const [shrink, setShrink] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 80) setShrink(true);
            else setShrink(false);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        window.location.href = '/login';
    };

    const loadCart = () => setCartView(true);

    return (
        <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1030 }}>
            <nav className={`navbar navbar-expand-lg navbar-dark bg-success shadow ${shrink ? 'navbar-shrink' : ''}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>
                            </li>
                            {localStorage.getItem('token') && (
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" to="/myorder">My Orders</Link>
                                </li>
                                
                            )}
                        </ul>

                        {!localStorage.getItem('token') ? (
                            <div className="d-flex">
                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center">
                                <div className="btn bg-white text-success mx-2 d-flex align-items-center btn-animated" onClick={loadCart} style={{ cursor: 'pointer' }}>
                                    <Badge color="secondary" badgeContent={items.length}>
                                        <ShoppingCartIcon />
                                    </Badge>
                                    <span className="ms-2">Cart</span>
                                </div>

                                {cartView && (
                                    <Modal onClose={() => setCartView(false)}>
                                        <Cart onClose={() => setCartView(false)} />
                                    </Modal>
                                )}

                                <button onClick={handleLogout} className="btn bg-white text-success">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
