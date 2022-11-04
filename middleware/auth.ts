//Required Dependencies
import jwt from "jsonwebtoken";
import { decode } from "punycode";
// const { REQUEST_ENTITY_TOO_LARGE } = require("../constants/httpStatusCodes");
import StringConstant from "../constants/strings";
import User from '../models/user'
import redisClient from '../database/redisConnection'
const config = process.env;
require("dotenv").config();

//Middleware to verify token
const verifyToken = async function (req:any, res:any, next:any) {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "production"
  ) {
    var accessToken = req.body.accessToken;
  } else {
    var accessToken = req.query.accessToken;
  }


  if (!accessToken) {
    //Token not found!
    return res.status(403).send(StringConstant.TOKEN_MISSING);
  }
  try {
    //Decode the found token and verify
    interface JwtPayload {
      username: string;
    }
    const decodedAccessToken = jwt.verify(accessToken, config.ACCESS_TOKEN_KEY!) as unknown as JwtPayload;
    const userName = decodedAccessToken.username
    
    redisClient.get('BL_' + userName.toString(),(err:any,data:any)=>{
      if (data === accessToken){
        return res.status(401).send(StringConstant.INVALID_TOKEN); 
      }else if(decodedAccessToken){
        req.user = decodedAccessToken;
      }else{
        return res.status(401).send(StringConstant.INVALID_TOKEN);
      }
      if(err) {
        console.log(err.message)
      }
    })
  } catch (err) {
    //Response for Invalid token
    return res.status(401).send(StringConstant.INVALID_TOKEN);
  }
  return next();
};

export default verifyToken;
