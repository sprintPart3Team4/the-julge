import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Input from "../../shopInfo/shopInfoForm/Input";
import classNames from "classnames/bind";
import styles from "./NoticeRegister.module.scss";

const cn = classNames.bind(styles);

export default function NoticeRegister() {
  const [hourlyPay, setHourlyPay] = useState<string | undefined>();
  const [startsAt, setStartAt] = useState<String | undefined>();
  const [workhour, setWorkHour] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
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
        <div className={cn("noticeData")}>
          <div className={cn("noticeBox")}>
            <label htmlFor="hourlyPay" className={cn("explan")}>
              시급*
            </label>
            <input
              id="hourlyPay"
              className={cn("noticeInput")}
              type="number"
              placeholder="입력"
              onChange={setState}
            ></input>
            <div className={cn("floatingText")}>원</div>
          </div>
          <div className={cn("noticeBox")}>
            <label htmlFor="startsAt" className={cn("explan")}>
              시작 일시*
            </label>
            <input
              id="startsAt"
              className={cn("noticeInput")}
              type="date"
              onChange={setState}
            ></input>
          </div>
          <div className={cn("noticeBox")}>
            <label htmlFor="workhour" className={cn("explan")}>
              업무 시간*
            </label>
            <input
              id="workhour"
              className={cn("noticeInput")}
              type="number"
              placeholder="입력"
              onChange={setState}
            ></input>
            <div className={cn("floatingText")}>시간</div>
          </div>
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
        <button
          className={cn(styles.button, {
            obstructButton: !hourlyPay || !startsAt || !workhour,
          })}
        >
          <span className={cn("buttonText")}>등록하기</span>
        </button>
      </form>
    </div>
  );
}
