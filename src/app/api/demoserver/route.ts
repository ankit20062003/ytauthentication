import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import applyMiddleware from '@/middlewares/multer.middleware'; // Adjust this path as per your project structure
import { NextRequest, NextResponse } from 'next/server';
import { stat } from 'fs';

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' }).single('avatar');

// Middleware to handle file upload
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  await applyMiddleware(req, res, upload); // Custom middleware for multer
  // Here you can handle additional logic after file upload if needed
  
  return NextResponse.json();
  
};

// Export named function for POST method
export const config = {
  api: {
    bodyParser: false, // Disable Next.js built-in bodyParser
  },
};

