import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
} from "react";
import classNames from "classnames/bind";
import CloseButton from "@/components/common/closeButton/CloseButton";
import Input from "../../../common/input/registerInput/Input";
import Button from "@/components/common/button/Button";
import Modal from "@/components/common/modal/Modal";
import usePostNotice from "@/components/register/notice/NoticeRegister/usePostNotice";
import styles from "./NoticeRegister.module.scss";

const cn = classNames.bind(styles);

interface Props {
  setIsRegisterOpen: (setIsRegisterOpen: boolean) => void;
}

export default function NoticeRegister({ setIsRegisterOpen }: Props) {
  const [hourlyPay, setHourlyPay] = useState<number>();
  const [startsAt, setStartAt] = useState<string>("");
  const [workhour, setWorkHour] = useState<number>();
  const [description, setDescription] = useState<string>("");
  const [okModal, setOkModal] = useState<boolean>(false);
  const [falseModal, setFalseModal] = useState<boolean>(false);
  const [ModalText, setModalText] = useState<string>("");

  const formatDate = (original: string) => {
    return `${original}:00Z`;
  };

  function setState(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
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

  const postSuccess: MouseEventHandler<HTMLButtonElement> = () => {
    setIsRegisterOpen(false);
  };

  const postFail: MouseEventHandler<HTMLButtonElement> = () => {
    setFalseModal(false);
  };

  function submit(e: FormEvent): void {
    e.preventDefault();

    const body = {
      hourlyPay,
      startsAt,
      workhour,
      description,
    };

    usePostNotice(body, setOkModal, setFalseModal, setModalText);
  }

  return (
    <div className={cn("wrapper")}>
      {okModal && (
        <Modal>
          <Modal.Confirm text={ModalText} handleButtonClick={postSuccess} />
        </Modal>
      )}
      {falseModal && (
        <Modal>
          <Modal.Confirm text={ModalText} handleButtonClick={postFail} />
        </Modal>
      )}
      <form onSubmit={submit} className={cn("formBox")}>
        <div className={cn("titleBox")}>
          <h1 className={cn("title")}>공고 등록</h1>
          <CloseButton setIsRegisterOpen={setIsRegisterOpen} />
        </div>
        <div className={cn("noticeBox")}>
          <Input
            id="hourlyPay"
            type="number"
            text="시급*"
            setter={setState}
            placeholder="입력"
            floatingText="원"
          />
          <Input
            id="startsAt"
            type="datetime-local"
            text="시작 일시*"
            setter={setState}
          />
          <Input
            id="workhour"
            type="number"
            text="업무 시간*"
            setter={setState}
            floatingText="시간"
            placeholder="입력"
          />
        </div>
        <div className={cn("descriptionBox")}>
          <label htmlFor="description" className={cn("explan")}>
            공고 설명
          </label>
          <textarea
            id="description"
            className={cn("description")}
            placeholder="입력"
            onChange={setState}
          ></textarea>
        </div>
        <Button
          text="등록하기"
          size="fixed"
          color="primary"
          handleButtonClick={submit}
        />
      </form>
    </div>
  );
}
