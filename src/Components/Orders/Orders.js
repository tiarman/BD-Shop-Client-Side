import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import Dashboard from '../Dashboard/Dashboard/Dashboard';
import './Orders.css';
import PaymentProcess from '../PaymentProcess/PaymentProcess';
import swal from 'sweetalert';
import { useHistory } from 'react-router';

const Orders = () => {
    const { id, price} = useParams();
    const [serviceInfo, setServiceInfo] = useState(JSON.parse(sessionStorage.getItem('service')));
    const clientInfo = useContext(UserContext)[0];
    console.log(id)
  const [selectedProduct, setSelectedProduct] = useState([])
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const handleCheckOut = paymentId => {
    const bookingDetails = { client_name: clientInfo.name, client_email: clientInfo.email, serviceInfo: { ...serviceInfo }, paymentId, status: 'Pending', bookingTime: new Date() }
    const newCheckOut = {...selectedProduct, ...loggedInUser, paymentId, status: 'Pending',}
    fetch('http://localhost:5000/addCheckOut', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newCheckOut)
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      if(data) {
        swal('Thanks', 'Your Booking is Successful', 'success')
        .then(() => {
          sessionStorage.removeItem('service')
          history.push('/homes')
        })
      }
    })
  }

  useEffect(() => {
    const url = `http://localhost:5000/allProducts/${id}`
      fetch(url)
      .then(res => res.json())
      .then(allProducts => setSelectedProduct(allProducts))
  }, [id])
    return (
        <div>
          <Dashboard></Dashboard>
      {
        selectedProduct.map(pd => 
          <div class="orders-align">
          <div className="container">
            <div className="align">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      style={{ height: "200px", maxWidth: "300px" }}
                      src={pd.imageUrl}
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <p className="card-text">
                        <Table striped bordered hover size="sm">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Product Name</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{id}</td>
                              <td>{pd.name}</td>
                              <td>${pd.price}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </p>
                      <br />
                      <Button className="btn btn-outline-warning">Bye Using Payment</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
      
      </div>
      <div>
        <h1>Pay Payment</h1>
        <div className="book-section">
        <div className="d-flex justify-content-between align-items-center mt-3 title-padding">
        </div>
        <div className="content-items padding-5">

          <div className="payment-info">
            <div className="pay-with mb-4">
              <p className="text-secondary">Pay With</p>
              <label htmlFor="credit-card">
                <input type="radio" id="credit-card" name="paymentMethod" defaultChecked={true} /> Credit Card
                </label>
              <label htmlFor="paypal">
                <input type="radio" id="paypal" name="paymentMethod" /> Paypal
                </label>
            </div>
            
            <PaymentProcess serviceCost={pd.cost} handlePayment={handleCheckOut}></PaymentProcess>
          </div>
          <h5 className='margin-0 '>Your Service Charged Will Be ${pd.price}</h5>
        </div>

      </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
        </div>
          
          
          )
      }
      
      </div>
    );
};

export default Orders;