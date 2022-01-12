import React, { useContext, useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons'
import { UserContext } from '../../../App';
import MainDashboard from '../MainDashboard/MainDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from "framer-motion";
import { Image } from 'react-bootstrap';
import { Link, useParams, useLocation } from 'react-router-dom';
import google from '../../../Images/google.png';
import './Dashboard.css';
import Profile from '../Profile/Profile';
//ssss
import { faSignOutAlt, faCartPlus, faBook, faCommentAlt, faPlus, faUser, faThLarge, faUserAlt, faList } from '@fortawesome/free-solid-svg-icons';
import { handleLogout } from '../../../App';

const Dashboard = () => {
    const { pathname } = useLocation();
    const mainPath = pathname.split('/')[1];
    const subpath = pathname.split('/')[2];

    const handleSidebar = () => {
        const navTogglerBtn = document.querySelector(".nav-toggler");
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("open");
        navTogglerBtn.classList.toggle("open");
    };
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false)
    const { panel } = useParams();



    useEffect(() => {
        fetch('http://localhost:5000/isAdmin', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({email: loggedInUser.email})
        })
        .then(res => res.json())
        .then(data => setIsAdmin(data));
    }, [])
    return (
            
        <div className="sidebar d-flex flex-column justify-content-between py-5 px-4">

        <div onClick={handleSidebar} className="nav-toggler">
            <span></span>
        </div>

        <ul className="list-unstyled">

            <li className="logo">
                <Link to="/" className="text-gradient">
                    HOME
                </Link>
            </li>                
                    <li onClick={handleSidebar}>
                        <Link to="/profile" className={subpath === undefined ? "side-bar-link active" : "side-bar-link"}>
                            <FontAwesomeIcon icon={faUserAlt} /> <span>Profile</span>
                        </Link>
                    </li>
                    <li onClick={handleSidebar}>
                        <Link to="/showCheckOut" className={subpath === 'booking-list' ? "side-bar-link active" : "side-bar-link"}>
                            <FontAwesomeIcon icon={faBook} /> <span>Order List</span>
                        </Link>
                    </li>
                    


                    
               { isAdmin && <div>

                <li onClick={handleSidebar}>
                        <Link to="/manageProducts" className={subpath === 'book' ? "side-bar-link active" : "side-bar-link"}>
                            <FontAwesomeIcon icon={faCartPlus} /> <span>Manage Product</span>
                        </Link>
                    </li>
                   
                <li onClick={handleSidebar}>
                        <Link to="/addproducts" className={subpath === 'add-service' ? "side-bar-link active" : "side-bar-link"}>
                            <FontAwesomeIcon icon={faPlus} /> <span>Add Product</span>
                        </Link>
                    </li>
                    <li onClick={handleSidebar}>
                        <Link to="/addAdmin" className={subpath === 'make-admin' ? "side-bar-link active" : "side-bar-link"}>
                            <FontAwesomeIcon icon={faUser} /> <span>Make Admin</span>
                        </Link>
                    </li>
                    <li onClick={handleSidebar}>
                        <Link to="/orderlist" className={subpath === 'client-list' ? "side-bar-link active" : "side-bar-link"}>
                            <FontAwesomeIcon icon={faList} /> <span>Client List</span>
                        </Link>
                    </li>
                    <li onClick={handleSidebar}>
                        <Link to="/getadmin" className={subpath === 'make-admin' ? "side-bar-link active" : "side-bar-link"}>
                            <FontAwesomeIcon icon={faUser} /> <span>Get Admin</span>
                        </Link>
                    </li>
                    <li onClick={handleSidebar}>
                        <Link to="allreviews" className={subpath === 'review' ? "side-bar-link active" : "side-bar-link"}>
                            <FontAwesomeIcon icon={faCommentAlt} /> <span>Manage Reviews</span>
                        </Link>
                    </li>
               </div>

                    }
                    <li onClick={handleSidebar}>
                        <Link to="reviews" className={subpath === 'review' ? "side-bar-link active" : "side-bar-link"}>
                            <FontAwesomeIcon icon={faCommentAlt} /> <span>Review</span>
                        </Link>
                    </li>     
           
        </ul>

        <div>
            <Link to="/"  onClick={handleLogout} className="text-dark side-bar-link "><FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span></Link>
        </div>
    </div>
    );
};

export default Dashboard;