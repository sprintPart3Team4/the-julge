import { useState, ChangeEvent, FormEvent, MouseEventHandler } from "react";
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

export default function NoticeRegister() {
  const [hourlyPay, setHourlyPay] = useState<number>();
  const [startsAt, setStartAt] = useState<string>("");
  const [workhour, setWorkHour] = useState<number>();
  const [description, setDescription] = useState<string>("");
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [failModal, setFailModal] = useState<boolean>(false);
  const [askCloseModal, setAskCloseModal] = useState<boolean>(false);
  const [ModalText, setModalText] = useState<string>("");
  const router = useRouter();

  const formatDate = (original: string) => {
    return `${original}:00Z`;
  };

  function setState(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const value = e.target.value;

    switch (e.target.id) {
      case "hourlyPay":
        setHourlyPay(Number(value));
        break;
      case "startsAt":
        setStartAt(String(value));
        break;
      case "workhour":
        setWorkHour(Number(value));
        break;
      case "description":
        setDescription(String(value));
        break;
    }
  }

  function movementToShop() {
    router.push("/shop");
  }

  function activateAskCloaseModal() {
    setAskCloseModal(true);
  }

  const postSuccess: MouseEventHandler<HTMLButtonElement> = () => {
    router.push("/shop");
  };

  const postFail: MouseEventHandler<HTMLButtonElement> = () => {
    setFailModal(false);
  };

  function submit(e: FormEvent): void {
    e.preventDefault();

    const body = {
      hourlyPay,
      startsAt: formatDate(startsAt),
      workhour,
      description,
    };

    usePostNotice(body, setSuccessModal, setFailModal, setModalText);
  }

  return (
    <div className={cn("wrapper")}>
      {successModal && (
        <Modal>
          <Modal.Confirm text={ModalText} handleButtonClick={postSuccess} />
        </Modal>
      )}
      {failModal && (
        <Modal>
          <Modal.Confirm text={ModalText} handleButtonClick={postFail} />
        </Modal>
      )}
      {askCloseModal && (
        <Modal>
          <Modal.YesOrNo
            text="등록을 취소하시겠어요?"
            yesButtonText="취소하기"
            setIsModalOpen={setAskCloseModal}
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
          value={description}
          onChange={setState}
        />
        <Button text="등록하기" size="fixed" color="primary" handleButtonClick={submit} />
      </form>
    </div>
  );
}
