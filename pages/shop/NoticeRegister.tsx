import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import CloseButton from "@/components/common/closeButton/CloseButton";
import Input from "../../components/common/input/Input";
import CalenderInput from "@/components/common/input/CalenderInput";
import Textarea from "@/components/common/textarea/Textarea";
import Button from "@/components/common/button/Button";
import Modal from "@/components/common/modal/Modal";
import usePostNotice from "@/components/register/notice/noticeRegister/usePostNotice";
import styles from "@/components/register/notice/NoticeRegister/NoticeRegister.module.scss";

const cn = classNames.bind(styles);

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

export default function NoticeRegister() {
  const [inputState, setInputState] = useState<StateType>({
    hourlyPay: undefined,
    startsAt: "",
    workhour: undefined,
    description: "",
  });
  
  const [modal, setModal] = useState<ModalType>({
    postSuccessModal: false,
    postFailModal: false,
    askCloseModal: false,
    modalText: "",
  });

  const router = useRouter();

  function setState(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const value = e.target.value;
    const property = e.target.id;
    setInputState((prevState: StateType) => ({ ...prevState, [property]: value }));
  }

  function activateAskCloaseModal(): void {
    setModal((prevState: ModalType) => ({ ...prevState, askCloseModal: true }));
  }

  function deActivateAskCloseModal(): void {
    setModal((prevState: ModalType) => ({ ...prevState, askCloseModal: false }));
  }

  function movementToShop(): void {
    router.push("/shop");
  }

  function postSuccess(): void {
    router.push("/shop");
  }

  function postFail(): void {
    setModal((prevState: ModalType) => ({ ...prevState, postFailModal: false }));
  }

  function submit(e: FormEvent): void {
    e.preventDefault();
    usePostNotice(inputState, setModal);
  }

  return (
    <div className={cn("wrapper")}>
      {modal.postSuccessModal && (
        <Modal>
          <Modal.Confirm text={modal.modalText} handleButtonClick={postSuccess} />
        </Modal>
      )}
      {modal.postFailModal && (
        <Modal>
          <Modal.Confirm text={modal.modalText} handleButtonClick={postFail} />
        </Modal>
      )}
      {modal.askCloseModal && (
        <Modal>
          <Modal.YesOrNo
            text="취소하시겠어요?"
            yesButtonText="취소하기"
            setIsModalOpen={deActivateAskCloseModal}
            handleYesButtonClick={movementToShop}
          />
        </Modal>
      )}
      <form onSubmit={submit} className={cn("formBox")}>
        <div className={cn("titleBox")}>
          <h1 className={cn("title")}>공고 등록</h1>
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
        <Button text="등록하기" size="fixed" color="primary" handleButtonClick={submit} />
      </form>
    </div>
  );
}
