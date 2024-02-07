import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import NoticeCard from "@/components/noticeList/noticeCard/noticeCard";
import getCookies from "@/lib/getCookies";
import styles from "./CustomNotice.module.scss";
import useUserCustom from "./useDobbyCustom";
import useNotUserCustom from "./useNotDobbyCustom";

const cn = classNames.bind(styles);

export default function CustomNotice() {
  const [customList, setCustomList] = useState<any>([]);
  const [dobbysCustomList, setDobbysCustomList] = useState<any>([]);
  const [isDobbyLogin, setIsDobbyLogin] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      const { shopId, token } = getCookies();
      if (shopId.length === 0) {
        await useUserCustom(setDobbysCustomList, token);
        setIsDobbyLogin(true);
      } else {
        await useNotUserCustom(setCustomList);
        setIsDobbyLogin(false);
      }
    }
    getData();
  }, []);

  return isDobbyLogin ? (
    <div className={cn("wrapper")}>
      <div className={cn("contentWrapper")}>
        <p className={cn("title")}>맞춤 공고</p>
        <div className={cn("noticeCardList")}>
          {dobbysCustomList.map((card: any, index: number) => (
            <div className={cn("noticeCardBox")} key={index}>
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
    <div className={cn("wrapper")}>
      <div className={cn("contentWrapper")}>
        <p className={cn("title")}>맞춤 공고</p>
        <div className={cn("noticeCardList")}>
          {customList.map((card: any, index: number) => (
            <div className={cn("noticeCardBox")} key={index}>
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
