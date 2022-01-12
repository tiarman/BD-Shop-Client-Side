import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Product from "./Components/Product/Product";
import AddProducts from "./Components/AddProducts/AddProducts";
import Orders from "./Components/Orders/Orders";
import { createContext } from "react";
import { useState } from "react";
import PrivateRoute from "./Components/LoginAuth/PrivateRoute/PrivateRoute";
import Dashboard from "./Components/Dashboard/Dashboard/Dashboard.js";
import ShowCheckOut from "./Components/ShowCheckOut/ShowCheckOut";
import ManageProducts from "./Components/Dashboard/ManageProducts/ManageProducts"
import AddAdmin from "./Components/AddAdmin/AddAdmin"
import MainDashboard from "./Components/Dashboard/MainDashboard/MainDashboard";
import LoginModal from "./Components/LoginAuth/LoginModal";
import Profile from "./Components/Dashboard/Profile/Profile";
import Sidebar from "./Components/Dashboard/Sidebar/Sidebar";
import Homes from "./Components/Home/Homes/Homes";
import Contact from "./Components/Contact/Contact";
import PaymentProcess from "./Components/PaymentProcess/PaymentProcess";
import SplitPaymentForm from "./Components/PaymentProcess/SplitPaymentForm";
import OrderList from "./Components/OrderList/OrderList/OrderList";
import OrderListTable from "./Components/OrderList/OrderListTable/OrderListTable";
import Review from "./Components/Dashboard/Review/Review/Review";
import AllReview from "./Components/Dashboard/Review/AllReview/AllReview";
import Testimonial from "./Components/Dashboard/Review/Testimonial/Testimonial";
import Testimonials from "./Components/Dashboard/Review/Testimonials/Testimonials";
import GetAdmins from "./Components/AddAdmin/GetAdmins/GetAdmins";

export const UserContext = createContext();
export const handleLogout = () => {
  localStorage.removeItem('loggedInUser');
  localStorage.removeItem('admin');
  window.location.reload();
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')) || {});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      
        <Switch>
        <Route exact path="/">
            <Homes />
          </Route>
          <Route path="/homes">
            <Homes />
          </Route>
          <Route path="/products">
            <Product/>
          </Route>
          <Route path="/addproducts">
            <AddProducts/>
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard/>
          </PrivateRoute>
          <PrivateRoute path="/orders/:id">
            <Orders/>
          </PrivateRoute>
          <Route path="/showCheckOut">
            <ShowCheckOut/>
          </Route>
          
          <Route path="/manageProducts">
            <ManageProducts/>
          </Route>
          <Route path="/addAdmin">
            <AddAdmin/>
          </Route>
          <Route path="/mainDashboard">
            <MainDashboard/>
          </Route>
          <Route path="/loginModel">
            <LoginModal/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/sidebar">
            <Sidebar/>
          </Route>
          <Route path="/contact">
            <Contact/>
          </Route>
          <Route path="/payment">
            <PaymentProcess/>
          </Route>
          <Route path="/payments">
            <SplitPaymentForm/>
          </Route>
          <Route path="/orderlist">
            <OrderList/>
          </Route>
          <Route path="/reviews">
            <Review/>
          </Route>
          <Route path="/allreviews">
            <AllReview/>
          </Route>
          <Route path="/testimonial">
            <Testimonials/>
          </Route>
          <Route path="/getadmin">
            <GetAdmins/>
          </Route>
        </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
