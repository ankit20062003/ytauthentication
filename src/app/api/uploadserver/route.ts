

import { v2 as cloudinary } from 'cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req : NextApiRequest , res : NextApiResponse, ) {

    // Configuration
console.log("here is the request obj" , req);
  cloudinary.config({
  cloud_name: "dig5xy7ny",
  api_key: "394586793467576",
  api_secret: "_lXNQoNzDnkDm0aLIW81Lf7qJ7M",
});
    // Upload an image
    console.log(req);
    //  const file = req.body;
    // console.log("here is the file received")
    // console.log(file);
    // console.log("here is the file received from postman / userform", req);
     const uploadResult = await cloudinary.uploader
       .upload(
        "https://picsum.photos/200/300", {
              resource_type: 'auto',
               public_id: 'my_image',
           }
       )
       .catch((error) => {
           console.log('error' ,error);
       });

      //  return uploadResult.json(uploadResult);
    // already a json object , no need to call json
    console.log("uploaded result", uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('my_image', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log("optimized url",optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('my_image', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log("auto crop url" ,autoCropUrl);    
    return NextResponse.json({uploadResult});

};


