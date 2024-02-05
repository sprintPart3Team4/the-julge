import {
  useState,
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
} from "react";
import classNames from "classnames/bind";
import CloseButton from "@/components/common/closeButton/CloseButton";
import Input from "../../../common/input/Input";
import Button from "@/components/common/button/Button";
import Modal from "@/components/common/modal/Modal";
import usePostNotice from "@/components/register/notice/NoticeRegister/usePostNotice";
import styles from "./NoticeRegister.module.scss";

const cn = classNames.bind(styles);

interface Props {
  toggleNoticeOpen: (toggleNoticeOpen: boolean) => void;
}

export default function NoticeRegister({ toggleNoticeOpen }: Props) {
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
    toggleNoticeOpen(false);
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
          <CloseButton stateToggle={toggleNoticeOpen} />
        </div>
        <div className={cn("noticeBox")}>
          <Input
            label="hourlyPay"
            title="시급"
            input={{
              type: "number",
              id: "hourlyPay",
              name: "hourlyPay"
            }}
            placeholder="0"
            onChange={setState}
            floatingText="원"
          />
          <Input
            label="startsAt"
            title="시작 일시"
            input={{
              type: "datetime-local",
              id: "startsAt",
              name: "startsAt"
            }}
            onChange={setState}
          />
          <Input
            label="workhour"
            title="업무 시간"
            input={{
              type: "number",
              id: "workhour",
              name: "workhour"
            }}
            onChange={setState}
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
