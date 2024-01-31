import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import classNames from "classnames/bind";
import Input from "./Input";
import Button from "@/components/common/button/Button";
import instance from "@/pages/api/axios";
import styles from "./NoticeRegister.module.scss";

const cn = classNames.bind(styles);

export default function NoticeRegister() {
  const [hourlyPay, setHourlyPay] = useState<number>();
  const [startsAt, setStartAt] = useState<string>("");
  const [workhour, setWorkHour] = useState<number>();
  const [description, setDescription] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const router = useRouter();
  const { shop_id } = router.query;
  const { notice_id } = router.query;

  useEffect((): void => {
    (async function getData() {
      const response = await instance.get(`/shops/${shop_id}/notices/${notice_id}`);
      const data = await response.data.item;
      const { hourlyPay, startsAt, workhour, description } = data;
      setHourlyPay(hourlyPay);
      setStartAt(startsAt);
      setWorkHour(workhour);
      setDescription(description);
    })
  }, [])

  function pageMovement(): void {}

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

  function submit(e: FormEvent): void {
    e.preventDefault();

    // const body = {
    //   hourlyPay: hourlyPay,
    //   startsAt: startsAt,
    //   workhour: workhour,
    //   description: description,
    // };

    // async function postData() {
    //   const response = await instance.post(`https://bootcamp-api.codeit.kr/api/2-4/the-julge`, body);
    //   const data = response.data;
    // }
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
            value={hourlyPay}
            setter={setState}
          />
          <Input
            id="startsAt"
            type="datetime-local"
            text="시작 일시*"
            value={startsAt}
            setter={setState}
          />
          <Input
            id="workhour"
            type="number"
            text="업무 시간*"
            floatingText="시간"
            value={workhour}
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
            value={description}
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
