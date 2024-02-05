import React, { Dispatch, SetStateAction } from "react";
import classNames from "classnames/bind";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import NotificationItem from "../notificationItem/NotificationItem";
import CloseIcon from "@/public/images/close.svg";
import styles from "./NotificationList.module.scss";

const cn = classNames.bind(styles);

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function NotificationList({ isOpen, setIsOpen }: Props) {
  const isMobile: boolean = useMediaQuery({
    query: "(max-width:743px)",
  });

  const closeNotification = () => {
    setIsOpen(false);
  };

  return (
    <div className={cn("wrap")}>
      <div className={cn("title")}>
        <h2>알림 6개</h2>
        {isMobile && isOpen && (
          <button type="button" onClick={closeNotification}>
            <Image src={CloseIcon} alt="창 닫기 아이콘" width={24} height={24} />
          </button>
        )}
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
