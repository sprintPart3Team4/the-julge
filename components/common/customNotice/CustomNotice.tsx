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
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: any;
}

interface Cookie {
  shopId: string | undefined;
  userId: string | undefined;
}

export default function CustomNotice() {
  const [customList, setCustomList] = useState<Array<Item>>([]);
  const [cookie, setCookie] = useState<Cookie>({ shopId: undefined, userId: undefined });
  const speed = customList.length < 4 ? "active" : "";

  useEffect(() => {
    const { shopId, userId } = getCookies();
    setCookie((prevState: Cookie) => ({ ...prevState, shopId: shopId, userId: userId }));

    async function showCarousel() {
      if (userId && !shopId) {
        const data = await useDobbyCustomList(setCustomList, userId);
        data.length === 0 ? useNotDobbyCustomList(setCustomList) : {};
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
        <div className={cn("noticeCardList", { active: speed })}>
          {customList.map((card: any, index: number) => {
            return (
              <div className={cn("noticeCardBox")} key={index}>
                <NoticeCard
                  key={card.item.id}
                  noticeId={card.item.id}
                  startsAt={card.item.startsAt}
                  workhour={card.item.workhour}
                  hourlyPay={card.item.hourlyPay}
                  closed={card.item.closed}
                  noticeShopId={card.item.shop.item.id}
                  myShopId={cookie.shopId}
                  imageUrl={card.item.shop.item.imageUrl}
                  name={card.item.shop.item.name}
                  address1={card.item.shop.item.address1}
                  originalHourlyPay={card.item.shop.item.originalHourlyPay}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
