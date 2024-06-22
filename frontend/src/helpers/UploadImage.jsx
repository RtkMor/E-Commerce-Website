const cloudinaryName = import.meta.env.VITE_CLOUDINARY_NAME;

if (!cloudinaryName) {
    throw new Error('VITE_CLOUDINARY_NAME is not defined');
}

const url = `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`;

async function UploadImage(image) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mern_product");

    const dataResponse = await fetch(url, {
        method: "post",
        body: formData
    });

    return dataResponse.json();
}

export default UploadImage;
