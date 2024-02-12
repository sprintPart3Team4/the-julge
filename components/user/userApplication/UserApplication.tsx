import classNames from "classnames/bind";
import StatusButton from "../../shopNoticePage/statusButton/StatusButton";
import StatusBadge from "../../shopNoticePage/statusBadge/StatusBadge";

import styles from "./UserApplications.module.scss";

const cn = classNames.bind(styles);

type Props = {
  applicationId: string;
  name?: string;
  startsAt?: string;
  hourlyPay?: string;
  status: "pending" | "accepted" | "rejected" | "canceled";
};

export default function UserApplication({ applicationId, name, startsAt, hourlyPay, status }: Props) {
  return (
    <tr className={cn("tr")}>
      <td className={cn("td", "name")}>{name}</td>
      <td className={cn("td", "bio")}>
        <div className={cn("bioLineUp")}>{startsAt}</div>
      </td>
      <td className={cn("td", "hourlyPay")}>{hourlyPay}원</td>
      <td className={cn("td", "status")}>
        <StatusBadge status={status} />
      </td>
    </tr>
  );
}
