import getCookies from "@/lib/getCookies";
import axios from "@/pages/api/axios";

// interface Prop {
//   hourlyPay: number | undefined;
//   startsAt: string;
//   workhour: number;
//   description: string;
// }

export default async function usePostNotice(
  body: any,
  setShowModal: any,
  setModalText: any
) {
  const { token, shopId } = getCookies();
  const noticeId = `0f4c29d7-5427-4d01-bebd-068256476bb1`;

  try {
    const res = await axios.put(`shops/${shopId}/notices/${noticeId}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API 수정 완료");
    console.log(res.data);
    setModalText("수정되었습니다.");
    setShowModal(true);
  } catch (error) {
    console.error("API 수정 중 오류 발생", error);
    setModalText("수정에 실패했습니다.");
    setShowModal(true);
  } finally {
  }
}
