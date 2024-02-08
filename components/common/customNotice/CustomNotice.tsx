import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import NoticeCard from "@/components/noticeList/noticeCard/noticeCard";
import getCookies from "@/lib/getCookies";
import useDobbyCustomList from "./useDobbyCustomList";
import useNotDobbyCustomList from "./useNotDobbyCustomList";
import styles from "./CustomNotice.module.scss";

const cn = classNames.bind(styles);

export default function CustomNotice() {
  const [customNoticeList, setCustomNoticeList] = useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      const cookie = getCookies();
      if (cookie.hasOwnProperty("userId")) {
        if (cookie.shopId === "") {
          console.log("알바님");
          await useDobbyCustomList(setCustomNoticeList);
        } else {
          console.log("사장님");
          await useNotDobbyCustomList(setCustomNoticeList);
        }
      } else {
        console.log("로그인 안한 유저");
        await useDobbyCustomList(setCustomNoticeList);
      }
    };

    getData();
  }, []);

  return (
    <div className={cn("wrap")}>
      <div className={cn("contentWrapper")}>
        <h1 className={cn("title")}>맞춤 공고</h1>
        <div className={cn("noticeCardList")}>
          {customNoticeList.map(({ item: { id, startsAt, workhour, hourlyPay, closed }}) => (
            <div className={cn("noticeCardBox")}>
              <NoticeCard
                key={id}
                startsAt={startsAt}
                workhour={workhour}
                hourlyPay={hourlyPay}
                closed={closed}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
