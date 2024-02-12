import { Dispatch, SetStateAction } from "react";
import instance from "@/lib/axiosInstance";

interface StateType {
  hourlyPay: number | undefined;
  startsAt: string;
  workhour: number | undefined;
  description: string;
}

interface ModalType {
  editSuccessModal: boolean;
  editFailModal: boolean;
  askCloseModal: boolean;
  modalText: string;
}

export default async function useEditNotice(
  inputState: StateType,
  shopId: string,
  noticeId: string | string[] | undefined,
  token: string,
  setModal: Dispatch<SetStateAction<ModalType>>
) {
  const formatDate = (original: string) => {
    return `${original}:00Z`;
  };

  const formatedDate = formatDate(inputState.startsAt);

  const requestBody = {
    ...inputState,
    startsAt: formatedDate,
  };

  try {
    const res = await instance.put(`shops/${shopId}/notices/${noticeId}`, requestBody, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setModal((prevState: ModalType) => ({ ...prevState, modalText: "수정되었습니다" }));
    setModal((prevState: ModalType) => ({ ...prevState, editSuccessModal: true }));
  } catch (error) {
    setModal((prevState: ModalType) => ({ ...prevState, modalText: "수정에 실패했습니다" }));
    setModal((prevState: ModalType) => ({ ...prevState, editFailModal: true }));
  }
}
