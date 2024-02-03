import getCookies from "@/lib/getCookies";
import axios from "@/pages/api/axios";

// interface Prop {
//   hourlyPay: number | undefined;
//   startsAt: string;
//   workhour: number;
//   description: string;
// }

export default async function useReloadNotice(noticeId: any) {
  const { token, shopId } = getCookies();

  try {
    const res = await axios.get(`shops/${shopId}/notices/${noticeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data.item;
    return [data.hourlyPay, data.startsAt, data.workhour, data.description];
  } catch (error) {
    console.error("API 응답 오류 발생", error);
  } finally {
  }
}
