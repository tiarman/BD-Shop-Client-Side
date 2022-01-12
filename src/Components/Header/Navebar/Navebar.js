import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';

const Navebar = () => {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
       
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/product">
                Product
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/addproducts">
                Add Products
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/orders">
                Orders
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/loginModel">
                Login Model
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/testf">
                Testf
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/showCheckOut">
                ShowCheckOut
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/manageProducts">
                Manage Products
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/addAdmin">
                Add Admin
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/mainDashboard">
                Main Dashboard
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/profile">
                Dashboard
              </Link>
            </li>
            <li class="nav-item">
              <button onClick={() => setLoggedInUser({ })}>Sign Out</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
};

export default Navebar;