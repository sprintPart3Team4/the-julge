import { useState, useEffect, ChangeEvent, FormEvent, MouseEventHandler } from "react";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import CloseButton from "@/components/common/closeButton/CloseButton";
import Input from "../../../common/input/Input";
import Button from "@/components/common/button/Button";
import Modal from "@/components/common/modal/Modal";
import useReloadNotice from "./useReloadNotice";
import useEditNotice from "./useEditNotice";
import styles from "./NoticeRegister.module.scss";
import { set } from "react-hook-form";
import CalenderInput from "@/components/common/input/calenderInput";

const cn = classNames.bind(styles);

export default function EditNoticeRegister() {
  const [hourlyPay, setHourlyPay] = useState<number>();
  const [startsAt, setStartAt] = useState<string>("");
  const [workhour, setWorkHour] = useState<number>();
  const [description, setDescription] = useState<string>("");
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [failModal, setFailModal] = useState<boolean>(false);
  const [askCloseModal, setAskCloseModal] = useState<boolean>(false);
  const [ModalText, setModalText] = useState<string>("");

  const router = useRouter();
  const { noticeId } = router.query;

  useEffect(() => {
    const reload = async () => {
      try {
        const reloadedData = await useReloadNotice(noticeId);
        console.log(reloadedData);
        setHourlyPay(reloadedData.hourlyPay);
        setStartAt(String(reloadedData.startsAt));
        setWorkHour(reloadedData.workHour);
        setDescription(reloadedData.description);
      } catch (error) {
        console.error("데이터 로드 중 에러 발생", error);
      }
    };

    reload();
  }, [noticeId]);

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
        setStartAt(formatDate(String(value)));
        break;
      case "workhour":
        setWorkHour(Number(value));
        break;
      case "description":
        setDescription(String(value));
        break;
    }
  }

  const putSuccess: MouseEventHandler<HTMLButtonElement> = () => {
    toggleNoticeOpen(false);
  };

  const putFail: MouseEventHandler<HTMLButtonElement> = () => {
    setFailModal(false);
  };

  function activateAskCloaseModal() {
    setAskCloseModal(true);
  }

  function submit(e: FormEvent): void {
    e.preventDefault();

    const body = {
      hourlyPay,
      startsAt,
      workhour,
      description,
    };

    useEditNotice(body, noticeId, setSuccessModal, setFailModal, setModalText);
  }

  return (
    <div className={cn("wrapper")}>
      {successModal && (
        <Modal>
          <Modal.Confirm text={ModalText} handleButtonClick={putSuccess} />
        </Modal>
      )}
      {failModal && (
        <Modal>
          <Modal.Confirm text={ModalText} handleButtonClick={putFail} />
        </Modal>
      )}
      {askCloseModal && (
        <Modal>
          <Modal.YesOrNo
            text="편집을 취소하시겠어요?"
            yesButtonText="취소하기"
            setIsModalOpen={setAskCloseModal}
            handleYesButtonClick={movementToShop}
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
        <div className={cn("descriptionBox")}>
          <label htmlFor="description" className={cn("explan")}>
            공고 설명
          </label>
          <textarea id="description" className={cn("description")} placeholder="입력" onChange={setState}></textarea>
        </div>
        <Button text="수정하기" size="fixed" color="primary" handleButtonClick={submit} />
      </form>
    </div>
  );
}
