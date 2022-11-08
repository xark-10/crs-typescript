import  redis from 'redis'
import dotenv from 'dotenv';


//connection to redis 
const redisClient = redis.createClient({host: process.env.REDIS_HOST,port: process.env.REDIS_PORT});

redisClient.on('connect',function(){
    console.log(`Redis Client Connected at port ${process.env.REDIS_PORT}`)
})

export default redisClient