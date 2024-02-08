import getCookies from "@/lib/getCookies";
import instance from "@/lib/axiosInstance";

export default async function usePostNotice(body: any, setSuccessModal: any, setFailModal: any, setModalText: any) {
  const { token, shopId } = getCookies();

  try {
    const res = await instance.post(`shops/${shopId}/notices`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API 전송 완료");
    console.log(res.data);
    setModalText("등록되었습니다.");
    setSuccessModal(true);
  } catch (error) {
    console.error("API 전송 중 오류 발생", error);
    setModalText("등록에 실패했습니다.");
    setFailModal(true);
  }
}
