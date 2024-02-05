import React, { useState } from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import Logo from "../logo/Logo";
import NotificationList from "./notificationList/NotificationList";
import { useAuth } from "@/contexts/AuthProvider";
import SearchIcon from "@/public/images/search.svg";
import ActiveNotificationIcon from "@/public/images/notification_active.svg";
import InactiveNotificationIcon from "@/public/images/notification_inactive.svg";
import styles from "./NavBar.module.scss";

const cn = classNames.bind(styles);

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, logout } = useAuth();

  const handleToggleNotification = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={cn("wrap")}>
      <div className={cn("logo")}>
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      <div className={cn("searchBar")}>
        <Image className={cn("icon")} src={SearchIcon} alt="돋보기 아이콘" width={16} height={16} />
        <input type="text" placeholder="가게 이름으로 찾아보세요" />
      </div>
      {user ? (
        <div className={cn("buttons")}>
          <Link href={"/profile"} className={cn("button")}>
            내 프로필
          </Link>
          <button type="button" className={cn("button")} onClick={logout}>
            로그아웃
          </button>
          <button type="button" className={cn("button")} onClick={handleToggleNotification}>
            <Image className={cn("icon")} src={InactiveNotificationIcon} alt="알림 아이콘" width={17} height={17} />
          </button>
          {isOpen && (
            <div className={cn("notification")}>
              <NotificationList isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          )}
        </div>
      ) : (
        <div className={cn("buttons")}>
          <Link href={"/signin"} className={cn("button")}>
            로그인
          </Link>
          <Link href={"/signup"} className={cn("button")}>
            회원가입
          </Link>
        </div>
      )}
    </nav>
  );
}
