import getCookies from "@/lib/getCookies";
import instance from "@/lib/axiosInstance";

export default async function useReloadNotice() {
  const { token, shopId, noticeId } = getCookies();

  try {
    const response = await instance.get(`shops/${shopId}/notices/${noticeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = response.data.item;
    return result;
  } catch (error) {
    console.error("API 응답 오류 발생", error);
  }
}
