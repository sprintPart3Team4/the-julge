import { useState, useEffect, ChangeEvent, FormEvent, MouseEventHandler } from "react";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import getCookies from "@/lib/getCookies";
import CloseButton from "@/components/common/closeButton/CloseButton";
import Input from "@/components/common/input/Input";
import CalenderInput from "@/components/common/input/CalenderInput";
import Textarea from "@/components/common/textarea/Textarea";
import Button from "@/components/common/button/Button";
import Modal from "@/components/common/modal/Modal";
import useReloadNotice from "@/components/register/notice/editNotice/useReloadNotice";
import useEditNotice from "@/components/register/notice/editNotice/useEditNotice";
import styles from "@/components/register/notice/EditNotice/EditNotice.module.scss";

const cn = classNames.bind(styles);

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

export default function EditNotice() {
  const [inputState, setInputState] = useState<StateType>({
    hourlyPay: undefined,
    startsAt: "",
    workhour: undefined,
    description: "",
  });
  const [modal, setModal] = useState<ModalType>({
    editSuccessModal: false,
    editFailModal: false,
    askCloseModal: false,
    modalText: "",
  });

  const router = useRouter();
  const { shopId, token } = getCookies();
  const { noticeId } = router.query;

  useEffect(() => {
    async function reload() {
      try {
        const reloadedData = await useReloadNotice(shopId, token, noticeId);
        setInputState((prevState: StateType) => ({ ...prevState, hourlyPay: reloadedData.hourlyPay }));
        setInputState((prevState: StateType) => ({ ...prevState, startsAt: reloadedData.startsAt }));
        setInputState((prevState: StateType) => ({ ...prevState, workhour: reloadedData.workhour }));
        setInputState((prevState: StateType) => ({ ...prevState, description: reloadedData.description }));
      } catch (error) {
        console.error("Input값 초기화 중 에러.", error);
      }
    }

    reload();
  }, []);

  function setState(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const value = e.target.value;
    const property = e.target.id;
    setInputState((prevState: StateType) => ({ ...prevState, [property]: value }));
  }

  function activateAskCloaseModal() {
    setModal((prevState: ModalType) => ({ ...prevState, askCloseModal: true }));
  }

  function deActivateAskCloseModal() {
    setModal((prevState: ModalType) => ({ ...prevState, askCloseModal: false }));
  }

  const editSucces: MouseEventHandler<HTMLButtonElement> = () => {
    movementToDetail();
  };

  const editFail: MouseEventHandler<HTMLButtonElement> = () => {
    setModal((prevState: ModalType) => ({ ...prevState, editFailModal: false }));
  };

  function movementToDetail() {
    router.push(`/shop/${noticeId}`);
  }

  function submit(e: FormEvent): void {
    e.preventDefault();

    useEditNotice(inputState, shopId, noticeId, token, setModal);
  }

  return (
    <div className={cn("wrapper")}>
      {modal.editSuccessModal && (
        <Modal>
          <Modal.Confirm text={modal.modalText} handleButtonClick={editSucces} />
        </Modal>
      )}
      {modal.editFailModal && (
        <Modal>
          <Modal.Confirm text={modal.modalText} handleButtonClick={editFail} />
        </Modal>
      )}
      {modal.askCloseModal && (
        <Modal>
          <Modal.YesOrNo
            text="취소하시겠어요?"
            yesButtonText="취소하기"
            setIsModalOpen={deActivateAskCloseModal}
            handleYesButtonClick={movementToDetail}
          />
        </Modal>
      )}
      <form onSubmit={submit} className={cn("formBox")}>
        <div className={cn("titleBox")}>
          <h1 className={cn("title")}>공고 편집</h1>
          <CloseButton buttonClickEvent={activateAskCloaseModal} />
        </div>
        <div className={cn("noticeBox")}>
          <Input
            label="hourlyPay"
            title="시급"
            input={{
              type: "number",
              id: "hourlyPay",
              name: "hourlyPay",
            }}
            value={inputState.hourlyPay}
            placeholder="0"
            onChange={setState}
            floatingText="원"
          />
          <CalenderInput
            label="startsAt"
            title="시작 일시"
            input={{
              type: "datetime-local",
              id: "startsAt",
              name: "startsAt",
            }}
            value={inputState.startsAt}
            onChange={setState}
          />
          <Input
            label="workhour"
            title="업무 시간"
            input={{
              type: "number",
              id: "workhour",
              name: "workhour",
            }}
            value={inputState.workhour}
            onChange={setState}
            floatingText="시간"
            placeholder="0"
          />
        </div>
        <Textarea
          label="description"
          title="공고 설명"
          textarea={{ id: "description", name: "description" }}
          value={inputState.description}
          onChange={setState}
        />
        <Button text="수정하기" size="fixed" color="primary" handleButtonClick={submit} />
      </form>
    </div>
  );
}
