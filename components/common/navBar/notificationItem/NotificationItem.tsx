import React from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import { getFullDate } from "@/lib/getFullDate";
import { calculateTimeAgo } from "@/lib/calculateTimeAgo";
import ApprovedIcon from "@/public/images/circle_approved.svg";
import RejectedIcon from "@/public/images/circle_rejected.svg";
import styles from "./NotificationItem.module.scss";

const cn = classNames.bind(styles);

type Props = {
  name: string;
  workhour: number;
  startsAt: string;
  result: "accepted" | "rejected";
  createdAt: string;
};

export default function NotificationItem({ name, workhour, startsAt, result, createdAt }: Props) {
  return (
    <div className={cn("card")}>
      <Image src={result === "accepted" ? ApprovedIcon : RejectedIcon} alt="결과 아이콘" width={5} height={5} />
      <span className={cn("message")}>
        {`${name}(${getFullDate(startsAt, workhour)}) 공고 지원이 `}
        <span className={cn(result)}>{result === "accepted" ? `승인` : `거절`}</span>
        {`되었어요.`}
      </span>
      <span className={cn("timeAgo")}>{calculateTimeAgo(createdAt)}</span>
    </div>
  );
}
