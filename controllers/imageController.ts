import jwt from 'jsonwebtoken';
import User from '../models/user';
import Cloudinary from '../database/cloudinaryConfig';


const imageActions = {
    /*
    profileImageUpload: async function (req:any, res:any) {
    
        try {
            console.log(req.body)
            if (
                process.env.NODE_ENV === "development" ||
                process.env.NODE_ENV === "production"
            ) {
                var accessToken = req.body.accessToken;
            } else {
                var accessToken = req.query.accessToken;
            }
            //decode the payload
            interface JwtPayload {
                username: string;
              }
            const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY!)as unknown as JwtPayload;
            const username = decodedAccessToken.username
            const user = await User.findOne({ username });


            if (!user)
                return res
                    .status(401)
                    .json({ success: false, message: 'unauthorized access!' });

            try {
               const result = await Cloudinary.uploader.upload(req.file.path, {
                    public_id: `${user._id}_profile`,
                    width: 500,
                    height: 500,
                    crop: 'fill',
                });

                const updatedUser = await User.findByIdAndUpdate(
                    user._id,
                    { avatar: result.url },
                );
                console.log()
                res
                    .status(201)
                    .json({ success: true, message: 'Your profile has updated!' });
            } catch (error) {
                console.log(error);
                res
                    .status(500)
                    .json({ success: false, message: 'server error, try after some time' });
            }
        } catch (error) {

        }

    }
    */
}
export default imageActions