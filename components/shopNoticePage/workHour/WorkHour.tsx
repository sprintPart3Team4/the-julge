import Image from "next/image";
import classNames from "classnames/bind";

import ClockActive from "@/public/images/clock.svg";
import ClockInactive from "@/public/images/clock_grey.svg";

import styles from "./WorkHour.module.scss";

const cn = classNames.bind(styles);

type Props = {
  startsAt: string;
  workHour: number;
  isClosed?: boolean;
};

export default function WorkHour({ startsAt, workHour, isClosed = false }: Props) {
  const fullDate = getFullDate(startsAt, workHour);
  const ImageSrc = isClosed ? ClockInactive : ClockActive;
  return (
    <div className={cn("workHour")}>
      <Image className={cn("icon")} src={ImageSrc} alt="시계 모양 아이콘" width={20} height={20} />
      {fullDate}
    </div>
  );
}

function getDate(date: Date) {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getTime(date: Date, workhour: number) {
  const hour = date.getHours();
  const endHour = hour + workhour > 24 ? hour + workhour - 24 : hour + workhour;
  const minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

  const startTime = `${hour}:${minute}`;
  const endTime = `${endHour}:${minute}`;

  return `${startTime}~${endTime} (${workhour}시간)`;
}

function getFullDate(sourceDate: string, workhour: number) {
  const date = new Date(sourceDate);

  return `${getDate(date)} ${getTime(date, workhour)}`;
}
