// Service to handle image uploads to ImgBB

// TODO: Replace this with your actual ImgBB API Key
// Get one for free at https://api.imgbb.com/
const IMGBB_API_KEY = 'd20dca4a84431fd910d7baf486afcd8d';

export const uploadToImgBB = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append('image', file);
  // ImgBB expires in 0 (never) by default, or you can set expiration (e.g., 600 seconds)
  // formData.append('expiration', '600'); 

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return data.data.url;
    } else {
      console.error('ImgBB Upload Failed:', data.error);
      throw new Error(data.error?.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Error uploading to ImgBB:', error);
    return null; // Fail gracefully so user can still submit manually if needed
  }
};