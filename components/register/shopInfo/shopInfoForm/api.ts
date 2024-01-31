import axios from "@/pages/api/axios";

export async function createPresinedURL(file: File) {
  try {
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNDE0NzE1Ni0yYTI4LTRmZTYtOTAzMS0zNzMyMmQ1NDExMmQiLCJpYXQiOjE3MDY1OTMwNTV9.ReFSPDwGt4z7zCBMR3XCE2Q6k1pCy8ygMa6jYqu0Kxo";

    const res = await axios.post(
      "images",
      {
        name: file.name
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const presignedUrl = res.data;
    uploadImageToS3(presignedUrl.item.url, file);
  } catch (error) {
    console.log(error);
  }
}

function uploadImageToS3(url: string, file: File) {
  try {
    axios.put(url, file);
  } catch (error) {
    console.error(error);
  }
}
