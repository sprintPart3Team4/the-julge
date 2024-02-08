import React from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import instance from "@/lib/axiosInstance";
import getCookies from "@/lib/getCookies";
import { useAuth } from "@/contexts/AuthProvider";
import { getFullDate } from "@/lib/getFullDate";
import { calculateTimeAgo } from "@/lib/calculateTimeAgo";
import ApprovedIcon from "@/public/images/circle_approved.svg";
import RejectedIcon from "@/public/images/circle_rejected.svg";
import styles from "./NotificationItem.module.scss";
import { Alerts } from "@/types/alertsType";

const cn = classNames.bind(styles);

type Props = {
  name: string;
  workhour: number;
  startsAt: string;
  result: "accepted" | "rejected";
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
    console.log(res.data);
    return res.data;
  };

  const handleClick = () => {
    if (user) putRead();
  };

  return (
    <div className={cn("card")} onClick={() => handleClick()}>
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
