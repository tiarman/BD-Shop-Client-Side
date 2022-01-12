import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import { Container, Row } from "react-bootstrap";
import spiner1 from "../../Images/spinner1.gif";
import "./Home.css";
import MainHeader from "../Headers/MainHeader";

const Home = () => {
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allProducts")
      .then((res) => res.json())
      .then((data) => setAllProduct(data));
  }, []);

  return (
    <div>
      <MainHeader></MainHeader>
      <section className="services" id="service">
        <Container>
          <Row className="mt-5 justify-content-center">
            {allProduct.length > 0 ? (
              allProduct.map((products) => (
                <Product products={products} key={products.name}></Product>
              ))
            ) : (
              <div className="m-auto">
                <img
                  className="img-fluid justify-content-center"
                  src={spiner1}
                  alt="..."
                />
              </div>
            )}
          </Row>
        </Container>
      </section>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default Home;
