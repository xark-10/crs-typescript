//TODO: Add JOI to the user schema and add validation to the firstName and lastName other required fields and perform validate before saving to avoid SQL Injection.
// https://www.npmjs.com/package/joi

// Required dependencies
import mongoose from "mongoose"
const Schema = mongoose.Schema;
import { Logger } from "logger"
import Hotel from './hotel'
require('dotenv').config()
import env from 'dotenv'

// User Schema definition
var rooms = new Schema(
  {
    hotel: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
    },
    number: {
      type: String,
      required: [true, 'Room number is required']
    },
    type: {
      type: String,
      required: [true, 'Please specify room type']
    },
    price: {
      type: Number,
      required: [true, 'Please specify price per night']
    },
    maxGuests: {
      type: Number,
      required: [true, 'Please specify maximum number of guests allowed']
    },
    dateCreated: {
      type: Date,
      default: Date.now
    },
    beds: {
      type: Number
    },
    image: {
      type: String,
    },
  },
  { collection: "Rooms" }
);



export default mongoose.model("Rooms", rooms);