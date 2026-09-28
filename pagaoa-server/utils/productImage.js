import { destroyImage, uploadImageBuffer } from '../config/cloudinary.js';

export const stripImagePublicId = (body = {}) => {
  const payload = { ...body };
  delete payload.imagePublicId;
  return payload;
};

export const attachUploadedImage = async (payload, file, previousPublicId) => {
  if (!file) {
    return payload;
  }

  const result = await uploadImageBuffer(file.buffer);

  if (previousPublicId && previousPublicId !== result.public_id) {
    await destroyImage(previousPublicId);
  }

  return {
    ...payload,
    image: result.secure_url,
    imagePublicId: result.public_id,
  };
};

export const removeStoredImage = async (publicId) => {
  if (!publicId) {
    return;
  }

  await destroyImage(publicId);
};
