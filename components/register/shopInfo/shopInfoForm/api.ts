import instance from "@/lib/axiosInstance";
import getCookies from "@/lib/getCookies";

export async function createPresinedURL(file: File) {
  try {
    const { token } = getCookies();
    const res = await instance.post(
      "images",
      {
        name: file.name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data;
    const presignedUrl = data.item.url;
    uploadImageToS3(presignedUrl, file);
    return presignedUrl;
  } catch (error) {
    console.log(error);
  }
}

function uploadImageToS3(url: string, file: File) {
  try {
    instance.put(url, file);
  } catch (error) {
    console.error(error);
  }
}
