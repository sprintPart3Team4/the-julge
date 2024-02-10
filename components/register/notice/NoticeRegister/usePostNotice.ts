import getCookies from "@/lib/getCookies";
import instance from "@/lib/axiosInstance";

interface StateType {
  hourlyPay: number | undefined;
  startsAt: string;
  workhour: number | undefined;
  description: string;
}

interface ModalType {
  postSuccessModal: boolean;
  postFailModal: boolean;
  askCloseModal: boolean;
  modalText: string;
}

export default async function usePostNotice(inputState: StateType, setModal: any) {
  const { token, shopId } = getCookies();

  try {
    const res = await instance.post(`shops/${shopId}/notices`, inputState, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API 전송 완료");
    console.log(res.data);
    setModal((prevState: ModalType) => ({...prevState, modalText: "등록되었습니다"}));
    setModal((prevState: ModalType) => ({...prevState, postSuccessModal: true}));
  } catch (error) {
    console.error("API 전송 중 오류 발생", error);
    setModal((prevState: ModalType) => ({...prevState, modalText: "등록에 실패했습니다"}));
    setModal((prevState: ModalType) => ({...prevState, postFailModal: true}));
  }
}
