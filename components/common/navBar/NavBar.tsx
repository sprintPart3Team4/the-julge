import React, { Dispatch, SetStateAction, useState } from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import Logo from "../logo/Logo";
import NotificationList from "./notificationList/NotificationList";
import { useAuth } from "@/contexts/AuthProvider";
import { NoticeList, getNotices } from "@/lib/getNotices";
import SearchIcon from "@/public/images/search.svg";
import ActiveNotificationIcon from "@/public/images/notification_active.svg";
import InactiveNotificationIcon from "@/public/images/notification_inactive.svg";
import styles from "./NavBar.module.scss";
import { useRouter } from "next/router";

const cn = classNames.bind(styles);

// type Props = {
//   setKeyword: Dispatch<SetStateAction<string>>;
//   setCount: Dispatch<SetStateAction<number>>;
//   setNoticeList: Dispatch<SetStateAction<NoticeList>>;
// };

export default function NavBar(/* { setKeyword, setCount, setNoticeList }: Props */) {
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(0);
  const [noticeList, setNoticeList] = useState<NoticeList>([]);

  const LIMIT_PER_SINGLE_PAGE = 30; // 한 페이지에 보여줄 데이터의 개수

  const handleKeywordChange = (e: any) => {
    setKeyword(e.target.value);
    // getNotices(0, LIMIT_PER_SINGLE_PAGE, e.target.value).then(({ count, items }) => {
    //   setCount(count);
    //   setNoticeList(items);
    // });
  };

  const router = useRouter();

  const handleKeywordSubmit = (e: any) => {
    e.preventDefault();
    const query = `?keyword=${keyword}`;
    // query ?
    router.push(`/search${query}`);
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
        <form onSubmit={handleKeywordSubmit}>
          <input type="text" placeholder="가게 이름으로 찾아보세요" onChange={handleKeywordChange} />
        </form>
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
