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
  const [isDobbyLogin, setIsDobbyLogin] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      const { shopId } = getCookies();
      if (shopId in getCookies()) {
        await useNotDobbyCustomList(setCustomNoticeList);
        setIsDobbyLogin(false);
      } else {
        await useDobbyCustomList(setCustomNoticeList);
        setIsDobbyLogin(true);
      }
    }
    getData();
  }, []);

  return isDobbyLogin ? (
    <div className={cn("wrap")}>
      <div className={cn("contentWrapper")}>
        <h1 className={cn("title")}>맞춤 공고</h1>
        <div className={cn("noticeCardList")}>
          {customNoticeList.map((card: any) => (
            <div className={cn("noticeCardBox")}>
              <NoticeCard
                key={card.item.id}
                startsAt={card.item.startsAt}
                workhour={card.item.workhour}
                hourlyPay={card.item.hourlyPay}
                closed={card.item.closed}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className={cn("wrap")}>
      <div className={cn("contentWrapper")}>
        <h1 className={cn("title")}>맞춤 공고</h1>
        <div className={cn("noticeCardList")}>
          {customNoticeList.map((card: any) => (
            <div className={cn("noticeCardBox")}>
              <NoticeCard
                key={card.item.id}
                startsAt={card.item.startsAt}
                workhour={card.item.workhour}
                hourlyPay={card.item.hourlyPay}
                closed={card.item.closed}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
