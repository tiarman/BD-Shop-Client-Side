import React, { useEffect, useState } from 'react';
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Testimonials.css'
import Testimonial from '../Testimonial/Testimonial';
import NavBar from '../../../Headers/NavBar/NavBar';

const Testimonials = () => {

    const [testimonialData, setTestimonialData] = useState(null)

    useEffect(() => {
        fetch("http://localhost:5000/all-review")
            .then(res => res.json())
            .then(data => setTestimonialData(data))
    }, [])

    return (
        <section>
            
        <NavBar></NavBar>
        <div id="review" style={{ height: "600px" }} className=" review-container bg-dark d-flex row  align-items-center justify-content-center pl-3">
           <div class="text-center ">
           <h5 className="section-title">Testimonial</h5>
            <h3 className=" text-light">Client opinions about us</h3>

           </div>
           
           
            <div class="testimonial-container">
                <Carousel
                    showArrows={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    autoPlay={true}
                    interval={6100}>
                    {testimonialData?.map((testimonial,index) => (
                        <Testimonial key={index} testimonial={testimonial} />
                    ))}

                </Carousel>
            </div>
        </div>
        </section>
    );
};

export default Testimonials;