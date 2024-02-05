import getCookies from "@/lib/getCookies";
import instance from "@/lib/axiosInstance";

export default async function useEditNotice(
  body: any,
  noticeId: any,
  setOkModal: any,
  setFalseModal: any,
  setModalText: any,
) {
  const { token, shopId } = getCookies();

  try {
    const res = await instance.put(`shops/${shopId}/notices/${noticeId}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API 수정 완료");
    console.log(res.data);
    setModalText("수정되었습니다.");
    setOkModal(true);
  } catch (error) {
    console.error("API 수정 중 오류 발생", error);
    setModalText("수정에 실패했습니다.");
    setFalseModal(true);
  } finally {
  }
}
