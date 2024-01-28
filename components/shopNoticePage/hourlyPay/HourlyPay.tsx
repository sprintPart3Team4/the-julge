import classNames from "classnames/bind";
import styles from "./HourlyPay.module.scss";

const cn = classNames.bind(styles);

type Props = {
  hourlypay: number;
};

export default function HourlyPay({ hourlypay }: Props) {
  return <span className={cn("hourlyPay")}>{hourlypay}원</span>;
}
