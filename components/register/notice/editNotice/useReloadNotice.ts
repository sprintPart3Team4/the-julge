import instance from "@/lib/axiosInstance";

export default async function useReloadNotice(shopId: string, token: string, noticeId: string | string[] | undefined) {
  try {
    const response = await instance.get(`shops/${shopId}/notices/${noticeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = response.data.item;
    result.startsAt = result.startsAt.slice(0, 16);

    return result;
  } catch (error) {
    console.error("API 응답 오류 발생", error);
  }
}
