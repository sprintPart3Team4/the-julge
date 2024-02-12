import Image from "next/image";
import classNames from "classnames/bind";
import { useMediaQuery } from "react-responsive";

import ArrowUpWhite from "@/public/images/arrow-up-bold-white.svg";
import ArrowUpGrey from "@/public/images/arrow-up-bold-grey.svg";
import ArrowUpRed40 from "@/public/images/arrow-up-bold-red40.svg";
import ArrowUpRed30 from "@/public/images/arrow-up-bold-red30.svg";
import ArrowUpRed20 from "@/public/images/arrow-up-bold-red20.svg";

import styles from "./HighPayRateBadge.module.scss";

const cn = classNames.bind(styles);

type Props = {
  isListedCard?: boolean;
  closed?: boolean;
  isPast?: boolean;
  hourlyPay: number;
  originalHourlyPay: number;
};

export default function HighPayRateBadge({
  isListedCard = false,
  closed = false,
  isPast = false,
  hourlyPay,
  originalHourlyPay,
}: Props) {
  const percentage = Number(((hourlyPay / originalHourlyPay) * 100 - 100).toFixed());

  let color, mobileRedArrow;
  if (percentage < 20) {
    color = "red20";
    mobileRedArrow = ArrowUpRed20;
  } else if (percentage < 50) {
    color = "red30";
    mobileRedArrow = ArrowUpRed30;
  } else {
    color = "red40";
    mobileRedArrow = ArrowUpRed40;
  }

  const isMobile: boolean = useMediaQuery({
    query: "(max-width:743px)",
  });

  let arrow = ArrowUpWhite;

  if (isMobile && isListedCard) {
    arrow = closed || isPast ? ArrowUpGrey : mobileRedArrow;
  }

  return (
    percentage != 0 && (
      <div className={cn(isMobile && isListedCard ? "mobileBadge" : "badge", { closed, isPast }, isPast || color)}>
        <span className={cn("percentage")}>기존 시급보다 {percentage}%</span>
        <Image
          className={cn("icon")}
          src={arrow}
          alt="기존 시급보다 높은 시급이라는 걸 표시하기 위해 위를 가리키는 화살표"
          width={20}
          height={20}
        />
      </div>
    )
  );
}
