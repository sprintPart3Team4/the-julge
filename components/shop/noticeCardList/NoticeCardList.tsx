import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import instance from "@/lib/axiosInstance";
import NoticeCard from "../noticeCard/NoticeCard";
import getCookies from "@/lib/getCookies";
import styles from "./NoticeCardList.module.scss";

const cn = classNames.bind(styles);

type Props = {
  offset: number;
  limit: number;
};

type Card = {
  item: {
    id?: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
  };
  links: string[];
};

type NoticeListResponse = {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: Card[];
  links: [];
};

const LIMIT = 6;

async function getNoticeList({ offset = 0, limit = LIMIT }, controller = null) {
  try {
    const { shopId } = getCookies();
    const query = `offset=${offset}&limit=${limit}`;
    let res;
    if (controller) {
      res = await instance.get<NoticeListResponse>(`shops/${shopId}/notices?${query}`, {
        signal: controller.signal,
      });
    } else {
      res = await instance.get<NoticeListResponse>(`shops/${shopId}/notices?${query}`);
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export default function NoticeCardList() {
  const [cardList, setCardList] = useState<Card[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver>();
  const lastCardRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          handleLoad({ offset, limit: LIMIT });
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNext, offset]
  );

  const handleLoad = async (options: Props, controller = null) => {
    try {
      const res = await getNoticeList(options, controller);
      if (res) {
        const { items, hasNext } = res;
        setCardList((prevList) => [...prevList, ...items]);
        setOffset((prev) => prev + LIMIT);
        setHasNext(hasNext);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      console.log(cardList);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    handleLoad({ offset, limit: LIMIT }, controller);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className={cn("wrap")}>
      {cardList.map(({ item: { id, startsAt, workhour, hourlyPay, closed } }, index) => {
        const noticeCardProps = {
          id,
          startsAt,
          workhour,
          hourlyPay,
          closed,
        };
        return (
          <NoticeCard key={id} ref={index === cardList.length - 1 ? lastCardRef : undefined} {...noticeCardProps} />
        );
      })}
    </div>
  );
}
