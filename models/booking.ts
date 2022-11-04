//TODO: Add JOI to the user schema and add validation to the firstName and lastName other required fields and perform validate before saving to avoid SQL Injection.
// https://www.npmjs.com/package/joi

// Required dependencies
import mongoose from "mongoose"
const Schema = mongoose.Schema;
import { Logger } from "logger"
import env from "dotenv"

  // User Schema definition
  var booking = new mongoose.Schema(
    {
      hotel: {
        type: Schema.Types.ObjectId,
        ref: "Hotel",
      },
      hotelName:{
        type: String
      },
      room: {
        type: Schema.Types.ObjectId,
        ref: "Rooms",
      },
      price: {
        type: String
      },
      guests:{
          type:Number
      },
      user:{
        type: Schema.Types.ObjectId,
        ref: "Users",      },
      check_in:{
        type: Date
      },
      check_out:{
        type: Date
      },
      bookingName:{
        type: String
      },
    },
    { collection: "Bookings" }
  );



export default mongoose.model("Bookings", booking);