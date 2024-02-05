import classNames from "classnames/bind";
import styles from "./StatusBadge.module.scss";

const cn = classNames.bind(styles);

type Status = "pending" | "accepted" | "rejected" | "canceled";

type Props = {
  status: Status;
};

export default function StatusBadge({ status }: Props) {
  const badgeName = getBadgeName(status);
  return <div className={cn("badge", status)}>{badgeName}</div>;
}

function getBadgeName(status: Status) {
  switch (status) {
    case "pending":
      return "대기 중";

    case "accepted":
      return "승인 완료";

    case "rejected":
      return "거절";

    case "canceled":
      return "지원 취소";

    default:
      const invalid: never = status;
      throw new Error(`unknown Status: ${invalid}`);
  }
}
