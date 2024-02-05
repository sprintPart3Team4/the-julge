import React from "react";
import classNames from "classnames/bind";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import NotificationItem from "../notificationItem/NotificationItem";
import CloseIcon from "@/public/images/close.svg";
import styles from "./NotificationList.module.scss";

const cn = classNames.bind(styles);

export default function NotificationList() {
  const isMobile: boolean = useMediaQuery({
    query: "(max-width:743px)",
  });

  return (
    <div className={cn("wrap")}>
      <div className={cn("title")}>
        <h2>알림 6개</h2>
        {isMobile && <Image src={CloseIcon} alt="창 닫기 아이콘" width={24} height={24} />}
      </div>
      <ul className={cn("list")}>
        <li>
          <NotificationItem status="승인" />
        </li>
        <li>
          <NotificationItem status="거절" />
        </li>
        <li>
          <NotificationItem status="승인" />
        </li>
        <li>
          <NotificationItem status="거절" />
        </li>
      </ul>
    </div>
  );
}
