import Image from "next/image";
import ArrowUp from "@/public/images/arrow-up-bold.svg";

type Props = {
  hourlyPay: number;
  originalHourlyPay: number;
  className: string;
  iconClassName: string;
};

export default function HourlyPayBadge({ hourlyPay, originalHourlyPay, className, iconClassName }: Props) {
  const percentage = (hourlyPay / originalHourlyPay) * 100;
  return (
    <span className={className}>
      기존 시급보다 {percentage}%
      <Image
        className={iconClassName}
        src={ArrowUp}
        alt="기존 시급보다 높은 시급이라는 걸 표시하기 위해 위를 가리키는 화살표"
        width={20}
        height={20}
      />
    </span>
  );
}
