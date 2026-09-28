import { v2 as cloudinary } from 'cloudinary';

export const assertCloudinaryConfig = () => {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const api_key = process.env.CLOUDINARY_API_KEY?.trim();
  const api_secret = process.env.CLOUDINARY_API_SECRET?.trim();

  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      'Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env'
    );
  }

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
};

export const uploadImageBuffer = (buffer) => {
  assertCloudinaryConfig();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'bulldogs-exchange/products' },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );

    stream.end(buffer);
  });
};

export const destroyImage = async (publicId) => {
  if (!publicId) {
    return;
  }

  assertCloudinaryConfig();
  await cloudinary.uploader.destroy(publicId);
};

export default cloudinary;
