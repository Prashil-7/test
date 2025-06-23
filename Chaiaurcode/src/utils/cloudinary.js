
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
        
    });

    // Upload function

    export const uploadCloudinary = async (localfilePath) => {
        try {
            if(!localfilePath) {
                throw new Error('File path is required');
            }
        const response = await cloudinary.uploader.upload(localfilePath,{
            resource_type:'auto'
        })
        //file uploaded iun the cloudinary
        //console.log('File uploaded to Cloudinary:', response.url);
        fs.unlinkSync(localfilePath); // upload ho gai to ab delete karo
        return response;
        } catch (error) {
            fs.unlinkSync(localfilePath); // Delete the file from local  storage agr err aya to
            return null;
            
        }
    }

    