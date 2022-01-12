import React from 'react';
import {Elements, CardElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SplitPaymentForm from './SplitPaymentForm';
import './PaymentProcess.css'


const stripePromise = loadStripe('pk_test_51J2R08JgbDUDKt4KkGLmgurCxzOjx1FJt8siCskBwCIujH6KjADsQm151HEaAGoiN0Ko4ZZYNUCzvi30UHcJZpz200o9sK9FhG');
const PaymentProcess = ({serviceCost,handlePayment}) => {
  
    

    return (
      <Elements stripe={stripePromise}>
      <SplitPaymentForm serviceCost={serviceCost} handlePayment={handlePayment}></SplitPaymentForm>
  </Elements>
    );
};

export default PaymentProcess;