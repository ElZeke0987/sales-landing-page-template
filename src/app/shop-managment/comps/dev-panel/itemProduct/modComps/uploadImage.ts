

export async function requestCloudinarySignature() {
    const signatureResponse = await fetch("/api/cloudinary-sign")
    if (!signatureResponse.ok) {
        throw new Error("Failed to fetch Cloudinary signature")
    }


    return signatureResponse.json()
}

export async function uploadImageToCloudinary(file: File) {
    const { signature, timestamp, cloudName, apiKey } = await requestCloudinarySignature()

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", "uploads");
    formData.append("public_id", file.name);
    console.log("formData: ", formData)
    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
        method: "POST",
        body: formData
        }
    );
    
    return await res.json();
}