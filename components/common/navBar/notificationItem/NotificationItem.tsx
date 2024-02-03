import React from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import ApprovedIcon from "@/public/images/circle_approved.svg";
import RejectedIcon from "@/public/images/circle_rejected.svg";
import styles from "./NotificationItem.module.scss";

const cn = classNames.bind(styles);

type Props = {
  status: "승인" | "거절";
};

export default function NotificationItem({ status }: Props) {
  return (
    <div className={cn("card")}>
      <Image src={status === "승인" ? ApprovedIcon : RejectedIcon} alt={`${status} 아이콘`} width={5} height={5} />
      <span className={cn("message")}>
        HS 과일주스(2023-01-14 15:00~18:00) 공고 지원이{" "}
        <span className={cn(status === "승인" ? "approved" : "rejected")}>{status}</span>되었어요.
      </span>
      <span className={cn("timeAgo")}>1분 전</span>
    </div>
  );
}
