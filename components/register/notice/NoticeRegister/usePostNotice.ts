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

  const formatDate = (original: string) => {
    return `${original}:00Z`;
  };

  const formatedDate = formatDate(inputState.startsAt);
  const requestBody = {
    ...inputState,
    startsAt: formatedDate
  };

  try {
    await instance.post(`shops/${shopId}/notices`, requestBody, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setModal((prevState: ModalType) => ({ ...prevState, modalText: "등록되었습니다" }));
    setModal((prevState: ModalType) => ({ ...prevState, postSuccessModal: true }));
  } catch (error) {
    console.error(error);
    setModal((prevState: ModalType) => ({ ...prevState, modalText: "등록에 실패했습니다" }));
    setModal((prevState: ModalType) => ({ ...prevState, postFailModal: true }));
  }
}
