import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import classNames from "classnames/bind";
import CloseButton from "@/components/common/closeButton/CloseButton";
import Input from "./Input";
import Button from "@/components/common/button/Button";
import useReloadNotice from "./useReloadNotice";
import usePostNotice from "@/components/register/notice/NoticeRegister/usePostNotice";
import instance from "@/pages/api/axios";
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

  const router = useRouter();
  const { shop_id } = router.query;
  const { notice_id } = router.query;

  function setState(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
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

  useEffect(() => {
    const {getHourlyPay, getStartsAt, getWorkhour, getDescription } = useReloadNotice()
    setHourlyPay(getHourlyPay);
    setStartAt(getStartsAt);
    setWorkHour(getWorkhour);
    setDescription(getDescription);
  }, []);

  function submit(e: FormEvent): void {
    e.preventDefault();

    const body = {
      hourlyPay: hourlyPay,
      startsAt: startsAt,
      workhour: workhour,
      description: description,
    };

    usePostNotice(body);
  }

  return (
    <div className={cn("wrapper")}>
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
            floatingText="원"
            setter={setState}
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
            floatingText="시간"
            setter={setState}
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
