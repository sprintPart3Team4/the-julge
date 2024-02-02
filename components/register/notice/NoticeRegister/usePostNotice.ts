import Modal from "@/components/common/modal/Modal";
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

  try {
    const res = await axios.post(`shops/${shopId}/notices`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API 등록 완료");
    console.log(res.data);
    setModalText("등록되었습니다.");
    setShowModal(true);
  } catch (error) {
    console.error("API 등록 중 오류 발생", error);
    setModalText("등록에 실패했습니다.");
    setShowModal(true);
  } finally {
  }
}
