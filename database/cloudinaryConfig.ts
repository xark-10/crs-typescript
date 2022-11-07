import cloudinary from 'cloudinary';
import env from 'dotenv'

const Cloudinary={
  cloud_name: process.env.CLOUDINARY_USER_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}

export default Cloudinary;