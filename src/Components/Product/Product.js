  
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from "framer-motion";
import { Button, Card, Col } from 'react-bootstrap';
import Bounce from 'react-reveal/Rotate';
import { Link } from 'react-router-dom';
import './Product.css'
// import React from "react";
// import { Button } from 'react-bootstrap';
import { useHistory } from "react-router";
import Footer from '../Footer/Footer';
import Header from '../Header/Header'

const Product = (props) => {
  console.log(props)
  const { _id, imageUrl, name, price } = props.products
  console.log(props.products);

  const history = useHistory()
    const handleOrdersProduct = (id) => {
      // console.log(_id)
        history.push(`/orders/${id}`);
    }
  return (
    
          <Col lg={4} md={6} className="mt-5">
             <motion.div  drag dragConstraints={{left:0, top:0, right:0, bottom:0}} dragElastic={0.5}>
                <Card className="cardAlign border-0 p-3 container card-container ">
                    <Bounce top cascade>
                        <img className='img-fluid' src={imageUrl} alt={name} />
                            <Card.Body>
                                <Card.Title as="h5" className="text-info">{name}</Card.Title>
                            </Card.Body>  
                            <Card.Footer className='d-flex justify-content-between align-items-center border-0'>
                                <h5>৳ {price}</h5>
                                <Button  variant='info' onClick={() => handleOrdersProduct(_id)} className="main-button"><FontAwesomeIcon icon={faShoppingCart}  />  Book</Button>            
                            </Card.Footer>
                        </Bounce>
                    </Card>
             </motion.div>
        </Col>
  );
};

export default Product;
