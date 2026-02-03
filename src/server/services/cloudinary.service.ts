import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import "dotenv/config";

class CloudinaryService {
    private apiKey:string;
    private apiSecret:string;
    private cloudName:string;
    constructor() {
        if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_CLOUD_NAME) {
            throw new Error("Cloudinary configuration missing");
        }
        this.apiKey = process.env.CLOUDINARY_API_KEY;
        this.apiSecret = process.env.CLOUDINARY_API_SECRET;
        this.cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        try{
            cloudinary.config({
                cloud_name: this.cloudName,
                api_key: this.apiKey,
                api_secret: this.apiSecret
            });
        }catch(error){
            console.log("Cloudinary config error:", error);
        }
    }
    async signatureRequest() {
        try {
            
            const timestamp = Math.round(Date.now() / 1000);
            const signature = cloudinary.utils.api_sign_request(
                {
                    timestamp,
                    folder: "thumbnails", // cambiá esto si querés
                    // allowed_formats: "webp,jpg,jpeg,png", // cambiá esto si querés
                },
                this.apiSecret
            );

            return NextResponse.json({
                signature,
                timestamp,
                cloudName: this.cloudName,
                apiKey: this.apiKey
            });

        } catch (error) {
            console.error("Cloudinary sign error:", error);
            return NextResponse.json({ error: "Error generating signature" }, { status: 500 });
        }
    }
    
}
    
export default new CloudinaryService() as CloudinaryService;