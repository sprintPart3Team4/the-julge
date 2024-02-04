import classNames from "classnames/bind";
import StatusButton from "../statusButton/StatusButton";
import StatusBadge from "../statusBadge/StatusBadge";

import styles from "./Applications.module.scss";

const cn = classNames.bind(styles);

type Props = {
  applicationId: string;
  name?: string;
  bio?: string;
  phone?: string;
  status: "pending" | "accepted" | "rejected" | "canceled";
};

export default function Application({ applicationId, name, bio, phone, status }: Props) {
  return (
    <tr className={cn("tr")}>
      <td className={cn("td", "name")}>{name}</td>
      <td className={cn("td", "bio")}>
        <div className={cn("bioLineUp")}>{bio}</div>
      </td>
      <td className={cn("td", "phone")}>{phone}</td>
      <td className={cn("td", "status")}>
        {status === "pending" ? (
          <div className={cn("statusButtons")}>
            <StatusButton status="rejected" text="거절하기" applicationId={applicationId} />
            <StatusButton status="accepted" text="승인하기" applicationId={applicationId} />
          </div>
        ) : (
          <StatusBadge status={status} />
        )}
      </td>
    </tr>
  );
}
