import Image from "next/image";
import ClockActive from "@/public/images/clock.svg";
import ClockInactive from "@/public/images/clock_grey.svg";

type Props = {
  startsAt: string;
  workHour: number;
  isClosed?: boolean;
};

export default function WorkHour({ startsAt, workHour, isClosed = false }: Props) {
  const date = getDate(startsAt);
  const time = getTime(startsAt, workHour);
  const ImageSrc = isClosed ? ClockInactive : ClockActive;
  return (
    <div>
      <Image src={ImageSrc} alt="시계 모양 아이콘" width={20} height={20} />
      {date} <span>{time}</span>
    </div>
  );
}

function getDate(sourceDate: string) {
  const date = new Date(sourceDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${[year, month, day].join("-")}`;
}

function getTime(sourceDate: string, workhour: number) {
  const date = new Date(sourceDate);

  const hour = date.getHours();
  const endHour = hour + workhour > 24 ? hour + workhour - 24 : hour + workhour;
  const minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

  const startTime = `${hour}:${minute}`;
  const endTime = `${endHour}:${minute}`;

  return `${startTime}~${endTime} (${workhour}시간)`;
}
