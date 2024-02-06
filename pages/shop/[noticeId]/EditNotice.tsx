import { useState, useEffect, ChangeEvent, FormEvent, MouseEventHandler } from "react";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import CloseButton from "@/components/common/closeButton/CloseButton";
import Input from "@/components/common/input/Input";
import CalenderInput from "@/components/common/input/CalenderInput";
import Textarea from "@/components/common/textarea/Textarea";
import Button from "@/components/common/button/Button";
import Modal from "@/components/common/modal/Modal";
import useReloadNotice from "../../../components/register/notice/editNotice/useReloadNotice";
import useEditNotice from "../../../components/register/notice/editNotice/useEditNotice";
import styles from "@/components/register/notice/EditNotice/EditNotice.module.scss";
import { set } from "react-hook-form";

const cn = classNames.bind(styles);

export default function EditNotice() {
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
        setStartAt(reformatDate(reloadedData.startsAt));
        console.log(startsAt);
        setWorkHour(reloadedData.workhour);
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

  const reformatDate = (original: string) => {
    return original.replace(":00.000Z", "");
  };

  function setState(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const value = e.target.value;

    switch (e.target.id) {
      case "hourlyPay":
        setHourlyPay(Number(value));
        break;
      case "startsAt":
        setStartAt(String(value));
        console.log(startsAt);
        break;
      case "workhour":
        setWorkHour(Number(value));
        break;
      case "description":
        setDescription(String(value));
        break;
    }
  }

  const putSuccess: MouseEventHandler<HTMLButtonElement> = () => {};

  const putFail: MouseEventHandler<HTMLButtonElement> = () => {
    setFailModal(false);
  };

  function movementToDetail() {
    router.push(`/shop/${noticeId}`);
  }

  function activateAskCloaseModal() {
    setAskCloseModal(true);
  }

  function submit(e: FormEvent): void {
    e.preventDefault();

    const body = {
      hourlyPay,
      startsAt: formatDate(startsAt),
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
            value={hourlyPay !== 0 ? hourlyPay : undefined}
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
            value={startsAt}
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
            value={workhour !== 0 ? workhour : undefined}
            onChange={setState}
            floatingText="시간"
            placeholder="0"
          />
        </div>
        <Textarea
          label="description"
          title="공고설명"
          textarea={{ id: "description", name: "description" }}
          value={description !== "" ? description : ""}
          onChangeHandler={setState}
        />
        <Button text="수정하기" size="fixed" color="primary" handleButtonClick={submit} />
      </form>
    </div>
  );
}
