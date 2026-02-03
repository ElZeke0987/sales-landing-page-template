
import CloudinaryService from "@/server/services/cloudinary.service";




export async function GET() {
  return CloudinaryService.signatureRequest();
}


