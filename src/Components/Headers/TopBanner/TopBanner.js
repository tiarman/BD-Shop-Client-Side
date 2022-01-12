import React from 'react';
import './TopBanner.css'
import bannerImage from '../../../Images/bannerImage.png';

const TopBanner = () => {
    return (
        <div className="container">
            <div className="row align-items-center">
                <div data-aos="fade-left" className="col-md-5 order-md-5">
                    <div className="banner-image">
                        <img src={bannerImage} alt="" />
                    </div>
                </div>
                <div data-aos="fade-right" className="col-md-7 mb-4">
                    <h1 className="text-gradient">Diligent Detectives <br /> For Yours</h1>
                    <p className="w-75 py-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt quasi ullam tempora voluptates molestiae similique possimus aliquam eius necessitatibus veritatis.</p>
                    <div className="button-box">
                        <a href="#service" className="btn-brand">Take Your Service</a>
                        <div className="btn-outline"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBanner;