// import { NextApiRequest, NextApiResponse } from 'next';
// import Stripe from 'stripe';

// const stripe = new Stripe('sk_test_...', {
//   apiVersion: '2020-08-27', // Ensure the API version matches your Stripe version
// });

// const endpointSecret = "whsec_1274eda82d890e0c83f730510e771fed9e9b0d52b3e765255025fd988dcf6a30";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end('Method Not Allowed');
//     return;
//   }

//   const sig = req.headers['stripe-signature'] as string;

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     res.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntentSucceeded = event.data.object as Stripe.PaymentIntent;
//       // Then define and call a function to handle the event payment_intent.succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   res.status(200).end();
// }
