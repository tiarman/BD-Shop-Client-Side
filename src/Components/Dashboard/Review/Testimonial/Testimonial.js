import React from 'react';
import './Testimonial.css';
import loginImg from '../../../../Images/AvatarFace.png'

const Testimonial = ({testimonial}) => {
    return (

        <div  class=" container-fluid card custom-card justify-content-center  d-flex flex-column" >
           <div  >
           <img src={testimonial.img ||loginImg} class="rounded-circle mt-3 border border-primary card-img-top  " alt="..."></img>
           </div>
            <div class="card-body pb-5">
                <p class="card-text m-0">{testimonial.name}</p>
                <h5 class="card-text m-0">{testimonial.address} </h5>
                <p class="card-text"><span class="text-success fs-2   ">”</span>  {testimonial.description} lor<span class="text-success fs-2">“</span> </p>
            </div>
        </div>

    );
};

export default Testimonial;