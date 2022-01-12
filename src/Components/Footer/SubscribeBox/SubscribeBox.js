import React from 'react';
import './SubscribeBox.css'
import { faBehance, faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SubscribeBox = () => {
    return (
        <section id="subscribe">

            <div className="container">
                <div className="row subscribe-container">

                    <div className="sub-box-single col-md-4 pb-4">
                        <h2>SUBSCRIBE NOW</h2>
                        <div className="sub-input-box">
                            <input type="text" placeholder="Enter Your E-mail" />
                            <input id="sub-submit" type="submit" value="Submit" />
                        </div>
                    </div>

                    <div className="sub-box-single col-md-4 pb-4">

                        <h2>CONTACTS NOW</h2>
                        <p>Call Us : +880 19982 00160</p>
                        <p>Email Us : emonhossain0317@gmail.com</p>

                    </div>

                    <div className="sub-box-single col-md-4 pb-4">
                        <h2>FOLLOW US</h2>
                        <div className="sub-fllow-icon">
                            <a href="/"><FontAwesomeIcon icon={faFacebookF}/></a>
                            <a href="/"><FontAwesomeIcon icon={faTwitter}/></a>
                            <a href="/"><FontAwesomeIcon icon={faLinkedinIn}/></a>
                            <a href="/"><FontAwesomeIcon icon={faInstagram}/></a>
                            <a href="/"><FontAwesomeIcon icon={faBehance}/></a>
                        </div>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default SubscribeBox;