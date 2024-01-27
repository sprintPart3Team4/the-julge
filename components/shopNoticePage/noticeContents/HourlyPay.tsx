type Props = {
  hourlypay: number;
  className: string;
};

export default function HourlyPay({ hourlypay, className }: Props) {
  return <span className={className}>{hourlypay}원</span>;
}
