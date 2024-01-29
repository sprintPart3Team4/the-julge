import Image from "next/image";
import classNames from "classnames/bind";

import ArrowUp from "@/public/images/arrow-up-bold.svg";

import styles from "./HighPayRateBadge.module.scss";

const cn = classNames.bind(styles);

type Props = {
  hourlyPay: number;
  originalHourlyPay: number;
};

export default function HighPayRateBadge({ hourlyPay, originalHourlyPay }: Props) {
  const percentage = ((hourlyPay / originalHourlyPay) * 100).toFixed();
  return (
    <div className={cn("badge")}>
      <span className={cn("percentage")}>기존 시급보다 {percentage}%</span>
      <Image
        className={cn("icon")}
        src={ArrowUp}
        alt="기존 시급보다 높은 시급이라는 걸 표시하기 위해 위를 가리키는 화살표"
        width={20}
        height={20}
      />
    </div>
  );
}
