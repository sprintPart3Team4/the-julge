import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import Logo from "../logo/Logo";
import { useRouter } from "next/router";
import NotificationList from "./notificationList/NotificationList";
import { useAuth } from "@/contexts/AuthProvider";
import SearchIcon from "@/public/images/search.svg";
import ActiveNotificationIcon from "@/public/images/notification_active.svg";
import InactiveNotificationIcon from "@/public/images/notification_inactive.svg";
import styles from "./NavBar.module.scss";

const cn = classNames.bind(styles);

export default function NavBar() {
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isActice, setIsActive] = useState(false);

  const { user, logout } = useAuth();

  const userPage = user?.type === "employee" ? "내 프로필" : "내 가게";

  const handleKeywordChange = (e: any) => {
    setKeyword(e.target.value);
  };

  const router = useRouter();

  const handleToggleNotification = () => {
    setIsOpen(!isOpen);
  };

  const handleKeywordSubmit = (e: any) => {
    e.preventDefault();
    const query = `?keyword=${keyword}`;
    router.push(`/search${query}`);
  };

  const notificationIcon = isActice ? ActiveNotificationIcon : InactiveNotificationIcon;

  return (
    <nav className={cn("wrap")}>
      <div className={cn("logo")}>
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      <div className={cn("searchBar")}>
        <Image className={cn("icon")} src={SearchIcon} alt="돋보기 아이콘" width={16} height={16} />
        <form onSubmit={handleKeywordSubmit}>
          <input type="text" placeholder="가게 이름으로 찾아보세요" onChange={handleKeywordChange} />
        </form>
      </div>
      {user ? (
        <div className={cn("buttons")}>
          <Link href={userPage === "내 가게" ? "/shop" : "/profile"} className={cn("button")}>
            {userPage}
          </Link>
          <Link href="/">
            <button type="button" className={cn("button")} onClick={logout}>
              로그아웃
            </button>
          </Link>
          {user.type === "employee" && (
            <button type="button" className={cn("button")} onClick={handleToggleNotification}>
              <Image className={cn("icon")} src={notificationIcon} alt="알림 아이콘" width={17} height={17} />
            </button>
          )}
          {isOpen && user.type === "employee" && (
            <div className={cn("notification")}>
              <NotificationList isOpen={isOpen} setIsOpen={setIsOpen} setIsActive={setIsActive} />
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
