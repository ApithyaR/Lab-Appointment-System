import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { success, error } from '../../../components/messages/CustomMessage';
import { makePayment } from '../../../services/payment';
import { createAppointment } from "../../../services/appointment";
import './payment.css'

const stripePromise = loadStripe('pk_test_51P2eSSKvJ8W8BQxVl5kkwJ7edV3QiGyjhwpoJNBmTncouaE7NqzZNbSO4YjHY3GYrL8LbeAvwSRHk8UjOwKYtqSh00kRXedluO');

const PaymentPage = () => {
    const location = useLocation();
    const history = useHistory();
    const [processing, setProcessing] = useState(false);

    const PaymentForm = () => {
        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async (event) => {
            event.preventDefault();
            setProcessing(true);

            try {
                const { patientId, doctorId, testId, timeslotId, appointmentCost } = location.state;
                // const { client_secret } = await makePayment(appointmentCost, localStorage.user);
                //
                // const { paymentMethod } = await stripe.confirmCardPayment(client_secret, {
                //     payment_method: {
                //         card: elements.getElement(CardElement),
                //     },
                // });

                // if (paymentMethod) {
                //     success('Payment successful');
                //
                    // Create the appointment after successful payment
                    await createAppointment(localStorage.getItem('user'), {
                        patientId,
                        doctorId,
                        testId,
                        timeslotId,
                    });

                    history.push('/appointments');
                // } else {
                //     error('Payment failed');
                // }
            } catch (err) {
                error('Payment failed');
                console.error(err);
            } finally {
                setProcessing(false);
            }
        };

        return (
            <form className="payment-form" onSubmit={handleSubmit}>
                <div className="stripe-card-element">
                    <CardElement/>
                </div>
                <button type="submit" disabled={!stripe || !elements || processing}>
                    {processing ? 'Processing...' : 'Pay'}
                </button>
            </form>
        );
    };

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm/>
        </Elements>
    );
};

export default PaymentPage;