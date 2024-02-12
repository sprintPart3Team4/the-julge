import Image from "next/image";
import classNames from "classnames/bind";
import { getFullDate } from "@/lib/getFullDate";
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
