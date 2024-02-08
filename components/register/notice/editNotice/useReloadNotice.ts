import getCookies from "@/lib/getCookies";
import instance from "@/lib/axiosInstance";

export default async function useReloadNotice(noticeId: any) {
  const { token, shopId } = getCookies();

  try {
    const res = await instance.get(`shops/${shopId}/notices/${noticeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data.item;
    console.log("API 응답 확인.")
    return data;
  } catch (error) {
    console.error("API 응답 오류 발생", error);
  }
}
