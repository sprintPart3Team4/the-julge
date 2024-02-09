import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import NoticeCard from "@/components/noticeList/noticeCard/noticeCard";
import getCookies from "@/lib/getCookies";
import useDobbyCustomList from "./useDobbyCustomList";
import useNotDobbyCustomList from "./useNotDobbyCustomList";
import styles from "./CustomNotice.module.scss";

const cn = classNames.bind(styles);

interface Item {
  id: string;
  hourlyPay: number;
  workhour: number;
  descriptio: string;
}

export default function CustomNotice() {
  const [customList, setCustomList] = useState<Array<Item>>([]);

  useEffect(() => {
    async function showCarousel() {
      const { userId, shopId } = getCookies();

      if (userId && !shopId) {
        await useDobbyCustomList(setCustomList, userId);
      } else {
        await useNotDobbyCustomList(setCustomList);
      }
    }
    showCarousel();
  }, []);

  return (
    <div className={cn("wrap")}>
      <div className={cn("contentWrap")}>
        <p className={cn("title")}>맞춤 공고</p>
        <div className={cn("noticeCardList")}>
          {customList.map((card: any, index: number) => (
            <div className={cn("noticeCardBox")} key={index}>
              <NoticeCard
                key={card.item.id}
                id={card.id}
                startsAt={card.item.startsAt}
                workhour={card.item.workhour}
                hourlyPay={card.item.hourlyPay}
                closed={card.item.closed}
                shop={card.item.shop}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
