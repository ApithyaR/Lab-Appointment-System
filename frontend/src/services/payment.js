const Stripe = require('stripe');
const stripe = Stripe('sk_test_51P2eSSKvJ8W8BQxVhTQQhp7vvov53tyX8odV2plIJ1Yyf2HP0MU4cqkrwv9f1rLMU9IwIVc56uFSj4Q6slFPSvnp003uZ6q0yF');

exports.makePayment = async (appointmentCost, userId) => {
    try {
        // Create a Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 5000 * 100, // Amount in cents
            currency: 'usd',
            metadata: {
                userId,
            },
        });
        return {client_secret: paymentIntent.client_secret};
    } catch (error) {
        if (error.type === 'StripeCardError') {
            // Handle card-related errors (e.g., declined card)
            console.log('Payment declined');
        } else if (error.type === 'StripeRateLimitError') {
            // Handle rate limiting errors
            console.log('Too many requests. Please try again later');
        } else {
            console.error('Error creating payment intent:', error);
        }
    }
};