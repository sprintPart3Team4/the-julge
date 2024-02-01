import { useCallback, useEffect, useRef, useState } from "react";
import useGetNoticeList from "@/hooks/useGetNoticeList";
import axios from "axios";
import getCookies from "@/lib/getCookies";
import NoticeCard from "../noticeCard/NoticeCard";
import styles from "./NoticeCardList.module.scss";
import classNames from "classnames/bind";
import useLoadCardList from "@/hooks/useLoadCardList";

const cn = classNames.bind(styles);

// 공고목록조회, 가게정보조회 필요

// type Props = {
//   offset: number;
//   limit: number;
// };

// type Card = {
//   item: {
//     id: string;
//     hourlyPay: number;
//     startsAt: string;
//     workhour: number;
//     description: string;
//     closed: boolean;
//   };
//   links: string[];
// };

async function getNoticeList({ offset = 0, limit = 3 }) {
  const { shopId } = getCookies();
  const query = `offset=${offset}&limit=${limit}`;
  const res = await axios.get(`shops/${shopId}/notices?${query}`);
  return res.data;
}

export default function FeatureNoticeCardList() {
  const [cardList, setCardList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const LIMIT = 3; // 데이터에서 받아와야 할 듯

  const observer = useRef();
  const lastCardRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          handleLoadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNext]
  );

  const handleLoad = async (options) => {
    const { items, hasNext } = await getNoticeList(options);
    try {
      if (options.offset === 0) {
        // 굳이???
        setCardList(items);
      } else {
        setCardList((prevList) => [...prevList, ...items]);
      }
      setOffset(options.offset + items.length);
      setHasNext(hasNext);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  const handleLoadMore = () => {
    handleLoad({ offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ offset: 0, limit: LIMIT });
  }, []);

  return (
    <>
      <div className={cn("wrap")}>
        {cardList.map((card, index) => {
          if (cardList.length === index + 1) {
            return (
              <NoticeCard
                ref={lastCardRef}
                key={card.item.id}
                startsAt={card.item.startsAt}
                workhour={card.item.workhour}
                hourlyPay={card.item.hourlyPay}
                closed={card.item.closed}
              />
            );
          } else {
            return (
              <NoticeCard
                key={card.item.id}
                startsAt={card.item.startsAt}
                workhour={card.item.workhour}
                hourlyPay={card.item.hourlyPay}
                closed={card.item.closed}
              />
            );
          }
        })}
      </div>
      {/* <button onClick={handleLoadMore}>더 보기</button> */}
    </>
  );
}
