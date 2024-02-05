import React from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import Logo from "../logo/Logo";
import SearchIcon from "@/public/images/search.svg";
import ActiveNotificationIcon from "@/public/images/notification_active.svg";
import InactiveNotificationIcon from "@/public/images/notification_inactive.svg";
import styles from "./NavBar.module.scss";

const cn = classNames.bind(styles);

export default function NavBar() {
  return (
    <nav className={cn("wrap")}>
      <div className={cn("logo")}>
        <Logo />
      </div>
      <div className={cn("searchBar")}>
        <Image className={cn("icon")} src={SearchIcon} alt="돋보기 아이콘" width={16} height={16} />
        <input type="text" placeholder="가게 이름으로 찾아보세요" />
      </div>
      <div className={cn("buttons")}>
        <Link href={"/signin"} className={cn("button")}>
          내 프로필
        </Link>
        <Link href={"/signin"} className={cn("button")}>
          로그아웃
        </Link>
        <Image className={cn("icon")} src={InactiveNotificationIcon} alt="알림 아이콘" width={17} height={17} />
      </div>
    </nav>
  );
}
