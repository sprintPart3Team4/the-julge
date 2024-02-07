import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import NotificationItem from "../notificationItem/NotificationItem";
import CloseIcon from "@/public/images/close.svg";
import { useAuth } from "@/contexts/AuthProvider";
import { getAlerts } from "@/lib/getAlerts";
import { AlertItems } from "@/types/alertsType";
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

  const { user } = useAuth();
  const [count, setCount] = useState<number>();
  const [items, setItems] = useState<AlertItems[]>();

  useEffect(() => {
    getAlerts(user?.id).then((res) => {
      setCount(res.count);
      setItems(res.items);
    });
  }, []);

  if (!user) return;
  return (
    <div className={cn("wrap")}>
      <div className={cn("title")}>
        <h2>알림 {count}개</h2>
        {isMobile && isOpen && (
          <button type="button" onClick={closeNotification}>
            <Image src={CloseIcon} alt="창 닫기 아이콘" width={24} height={24} />
          </button>
        )}
      </div>
      <ul className={cn("list")}>
        {items?.map((el) => {
          const notificationItemProps = {
            name: el.items?.shop.name,
            workhour: el.items?.notice.workhour,
            startsAt: el.items?.notice.startsAt,
            result: el.items?.result,
            createdAt: el.items?.createdAt,
          };

          return (
            <li key={el.items?.id}>
              <NotificationItem {...notificationItemProps} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
