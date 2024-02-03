import getCookies from "@/lib/getCookies";
import instance from "@/lib/axiosInstance";

export default async function usePostNotice(
  body: any,
  setOkModal: any,
  setFalseModal: any,
  setModalText: any
) {
  const { token, shopId } = getCookies();

  try {
    const res = await instance.post(`shops/${shopId}/notices`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API 등록 완료");
    console.log(res.data);
    setModalText("등록되었습니다.");
    setOkModal(true);
  } catch (error) {
    console.error("API 등록 중 오류 발생", error);
    setModalText("등록에 실패했습니다.");
    setFalseModal(true);
  } finally {
  }
}
