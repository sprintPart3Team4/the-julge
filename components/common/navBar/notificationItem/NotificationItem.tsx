import React from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import { getFullDate } from "@/lib/getFullDate";
import ApprovedIcon from "@/public/images/circle_approved.svg";
import RejectedIcon from "@/public/images/circle_rejected.svg";
import styles from "./NotificationItem.module.scss";
import { create } from "domain";

const cn = classNames.bind(styles);

type Props = {
  name: string;
  workhour: number;
  startsAt: string;
  result: "accepted" | "rejected";
  createdAt: string;
};

export default function NotificationItem({ name, workhour, startsAt, result, createdAt }: Props) {
  const calculateTimeAgo = (createdAt: string) => {
    const now = new Date();
    const createdTime = new Date(createdAt);

    const seconds = Math.floor((now.getTime() - createdTime.getTime()) / 1000);
    if (seconds < 60) return "방금 전";

    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;

    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;

    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;

    return `${createdTime.toLocaleDateString()}`;
  };

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
