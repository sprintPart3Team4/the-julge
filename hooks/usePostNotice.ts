import instance from "@/pages/api/axios";
import getCookies from "@/lib/getCookies";

interface Prop {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}

export default async function usePostNotice(body: Prop) {
  const { token, shopId } = getCookies();
  try {
    const res = await instance.post(`shops/${shopId}/notices`, body, {
      headers: {Authorization: `Bearer ${token}`}
    });
    console.log("API 등록 완료");
    console.log(res.data)
  } catch (error) {
    console.error("API 등록 중 오류 발생", error);
  } finally {
  }
}