import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import instance from "@/lib/axiosInstance";
import NoticeCard from "@/components/shop/noticeCard/NoticeCard";
import MainTitle from "@/components/shopNoticePage/mainTitle/MainTitle";
import getCookies from "@/lib/getCookies";
import classNames from "classnames/bind";
import styles from "@/styles/detail.module.scss";

const cn = classNames.bind(styles);

type Card = {
  item: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
  };
  links: string[];
};

async function getNoticeList() {
  const { shopId } = getCookies();
  const res = await instance.get(`shops/${shopId}/notices`);
  return res.data;
}

export default function WatchedNotice() {
  const [cardList, setCardList] = useState<Card[]>([]);
  const [watchedItem, setWatchedItem] = useState<Card[]>([]);
  const router = useRouter();
  const { id } = router.query;

  const handleLoadNotice = async () => {
    const { items } = await getNoticeList();
    setCardList(items);
  };

  useEffect(() => {
    if (id) {
      const stored = localStorage.getItem("watched");
      let watched = stored ? JSON.parse(stored) : [];
      watched.unshift(id);

      const uniqueWatched = [...new Set(watched)];
      localStorage.setItem("watched", JSON.stringify(uniqueWatched));
      setWatchedItem(cardList.filter((card) => uniqueWatched.includes(card.item.id)).slice(0, 6));
    }
  }, [id, cardList]);

  useEffect(() => {
    handleLoadNotice();
  }, []);

  return (
    <>
      <MainTitle mainTitle="최근에 본 공고" />
      <div className={cn("wrap")}>
        {watchedItem.map((card) => {
          return (
            <NoticeCard
              key={card.item.id}
              startsAt={card.item.startsAt}
              workhour={card.item.workhour}
              hourlyPay={card.item.hourlyPay}
              closed={card.item.closed}
            />
          );
        })}
      </div>
    </>
  );
}
