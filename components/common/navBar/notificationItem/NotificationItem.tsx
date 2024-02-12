import React from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import instance from "@/lib/axiosInstance";
import getCookies from "@/lib/getCookies";
import { useAuth } from "@/contexts/AuthProvider";
import { getWorkingDate } from "@/lib/getFullDate";
import { calculateTimeAgo } from "@/lib/calculateTimeAgo";
import ApprovedIcon from "@/public/images/circle_approved.svg";
import RejectedIcon from "@/public/images/circle_rejected.svg";
import CanceledIcon from "@/public/images/circle_canceled.svg";
import styles from "./NotificationItem.module.scss";
import { Alerts } from "@/types/alertsType";

const cn = classNames.bind(styles);

type Props = {
  name: string;
  workhour: number;
  startsAt: string;
  result: "accepted" | "rejected" | "canceled";
  createdAt: string;
  id: string;
};

export default function NotificationItem({ name, workhour, startsAt, result, createdAt, id: alertId }: Props) {
  const { user } = useAuth();

  const putRead = async (): Promise<Alerts> => {
    const { token, userId } = getCookies();
    const res = await instance.put(`users/${userId}/alerts/${alertId}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };

  const handleClick = () => {
    if (user) putRead();
  };

  let resultIcon;
  let resultMessage;
  switch (result) {
    case "accepted":
      resultIcon = ApprovedIcon;
      resultMessage = "승인";
      break;
    case "rejected":
      resultIcon = RejectedIcon;
      resultMessage = "거절";
      break;
    case "canceled":
      resultIcon = CanceledIcon;
      resultMessage = "취소";
  }

  return (
    <div className={cn("card")} onClick={() => handleClick()}>
      <Image src={resultIcon} alt="결과 아이콘" width={5} height={5} />
      <span className={cn("message")}>
        {`${name}(${getWorkingDate(startsAt, workhour)}) 공고 지원이 `}
        <span className={cn(result)}>{resultMessage}</span>
        {`되었어요.`}
      </span>
      <span className={cn("timeAgo")}>{calculateTimeAgo(createdAt)}</span>
    </div>
  );
}
