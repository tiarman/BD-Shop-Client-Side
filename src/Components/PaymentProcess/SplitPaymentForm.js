import React, { useMemo } from "react";
import {
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe
} from "@stripe/react-stripe-js";
import useResponsiveFontSize from "./useResponsiveFontSize";
import swal from 'sweetalert';

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const SplitPaymentForm = ({ serviceCost, handlePayment }) => {

  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();


  const handleSubmit = async event => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)
    });

    if (error) {
      swal('Field', error.message, 'error')
    } else {
      handlePayment(paymentMethod.id)
    }
  };

  return (
    <div className="width-50">
      <form onSubmit={handleSubmit}>
        <label className="label">
          Card number
        <CardNumberElement
            options={options}
          />
        </label>
        <div className="row">
          <label className="label col-6">
            Expiration date
            <CardExpiryElement
              options={options}
            />
          </label>
          <label className="label col-6">
            CVC
            <CardCvcElement
              options={options}
            />
          </label>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          {/* <h5 className='margin-0 '>Your Service Charged Will Be ${serviceCost}</h5> */}
        <button className="btn btn-success pay-btn" type="submit">Pay Now</button>
        </div>
      </form>
    </div>
  );
};

export default SplitPaymentForm;