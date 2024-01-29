import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import classNames from "classnames/bind";
import Input from "./Input";
import Button from "@/components/common/button/Button";
import styles from "./NoticeRegister.module.scss";

const cn = classNames.bind(styles);

export default function NoticeRegister() {
  const [hourlyPay, setHourlyPay] = useState<String | undefined>();
  const [startsAt, setStartAt] = useState<String | undefined>();
  const [workhour, setWorkHour] = useState<String | undefined>();
  const [description, setDescription] = useState<String | undefined>();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const router = useRouter();
  const { shop_id } = router.query;

  function pageMovement(): void {}

  function setState(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const value = e.target.value;

    switch (e.target.id) {
      case "hourlyPay":
        setHourlyPay(String(value));
        break;
      case "startsAt":
        setStartAt(String(value));
        break;
      case "workhour":
        setWorkHour(String(value));
        break;
      case "description":
        setDescription(String(value));
        break;
    }
  }

  function submit(e: FormEvent): void {
    e.preventDefault();
  }

  return (
    <div className={cn("wrapper")}>
      <form onSubmit={submit} className={cn("formBox")}>
        <div className={cn("titleBox")}>
          <h1 className={cn("title")}>공고 등록</h1>
          <Link href={""}>
            <Image
              className={cn("closeButton")}
              src="/images/close.svg"
              alt="closeButton"
              width={32}
              height={32}
              onClick={pageMovement}
            />
          </Link>
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
        <Button text="등록하기" size="fixed" color="primary" handleButtonClick={submit}/>
      </form>
    </div>
  );
}

