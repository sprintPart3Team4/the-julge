import Image from "next/image";
import classNames from "classnames/bind";
import { useMediaQuery } from "react-responsive";

import ArrowUpWhite from "@/public/images/arrow-up-bold-white.svg";
import ArrowUpRed from "@/public/images/arrow-up-bold-red.svg";
import ArrowUpGrey from "@/public/images/arrow-up-bold-grey.svg";

import styles from "./HighPayRateBadge.module.scss";

const cn = classNames.bind(styles);

type Props = {
  isListedCard?: boolean;
  closed?: boolean;
  hourlyPay: number;
  originalHourlyPay: number;
};

export default function HighPayRateBadge({
  isListedCard = false,
  closed = false,
  hourlyPay,
  originalHourlyPay,
}: Props) {
  const percentage = ((hourlyPay / originalHourlyPay) * 100).toFixed();

  const isMobile: boolean = useMediaQuery({
    query: "(max-width:743px)",
  });

  let arrow = ArrowUpWhite;

  if (isMobile && isListedCard) {
    arrow = closed ? ArrowUpGrey : ArrowUpRed;
  }

  return (
    <div className={cn(isMobile && isListedCard ? "mobileBadge" : "badge", { closed })}>
      <span className={cn("percentage")}>기존 시급보다 {percentage}%</span>
      <Image
        className={cn("icon")}
        src={arrow}
        alt="기존 시급보다 높은 시급이라는 걸 표시하기 위해 위를 가리키는 화살표"
        width={20}
        height={20}
      />
    </div>
  );
}
