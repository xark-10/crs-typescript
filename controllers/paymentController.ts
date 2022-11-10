import Stripe from 'stripe'
import Rooms from '../models/rooms'
import Hotel from '../models/hotel'
import Booking from '../models/booking'
import httpStatusCode from '../constants/httpStatusCodes';
import authStringConstant from '../constants/strings'
import moment from 'moment'
import dotenv from 'dotenv'
import {Request, Response, Application} from 'express';

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: '2020-08-27',
  });

const stripePayment = {
    payRoute: async function (req:Request, res:Response) {
        try {
            const { email, hotel_id, check_in, type, price} = req.body;
            const hotel = await Hotel.findOne({ _id: hotel_id })

        

            let categoryCount = 0
            if (type === 'couple') {
                categoryCount = hotel.couple
                console.log(categoryCount)
            } else if (type === 'single') {
                categoryCount = hotel.single

            } else if (type === 'superDeluxe') {
                categoryCount = hotel.doublecart

            } else if (type === 'deluxe') {
                categoryCount = hotel.deluxe

            } else if (type === 'luxury') {
                categoryCount = hotel.luxury

            } else {
                categoryCount = 0
            }
            const checkInDateFormat = moment(new Date(check_in)).format('YYYY-MM-DD');
            const checkInDate = new Date(checkInDateFormat)
            //if (!email) return res.status(400).json({ message: "Please enter a valid email" });
            Booking.find({ hotel: hotel._id, "check_out": { $gte: checkInDate } },async function (err:any, foundBookings:any) {
                if (foundBookings.length === 0 || foundBookings.length < categoryCount) {
                    const paymentIntent = await stripe.paymentIntents.create({
                        amount: price * 100,
                        currency: "INR",
                        automatic_payment_methods: {
                            enabled: true,
                          },
                        metadata: { email },
                    });
                    const clientSecret = paymentIntent.client_secret;
                    res.json({ message: "Payment initiated", clientSecret });
                } else {
                    res.status(httpStatusCode.GATEWAY_TIMEOUT).send({
                        success: false,
                        message: authStringConstant.ROOM_BOOKED,
                    });
                }
            })
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Internal server error",
                error: err
            });
        }
    },
    stripeRoute: async function (req:Request, res:Response) {
        const sig = req.headers["stripe-signature"];
        let event;
        try {
            event = await stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET!
            );
        } catch (err:any) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
        // Event when a payment is initiated
        if (event.type === "payment_intent.created") {
            console.log(`${event.data.object.metadata.name} initated payment!`);
        }
        // Event when a payment is succeeded
        if (event.type === "payment_intent.succeeded") {
            console.log(`${event.data.object.metadata.name} succeeded payment!`);
            // fulfilment
        }
        res.json({ ok: true });
    }
}

export default stripePayment

