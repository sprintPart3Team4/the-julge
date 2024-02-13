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
  items: Card[];
  hasNext: boolean;
};

const LIMIT = 6;

async function getNoticeList({ offset = 0, limit = LIMIT }: Props): Promise<NoticeListResponse> {
  const { shopId } = getCookies();
  const query = `offset=${offset}&limit=${limit}`;
  const res = await instance.get<NoticeListResponse>(`shops/${shopId}/notices?${query}`);
  return res.data;
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

  const handleLoad = async (options: Props) => {
    const { items, hasNext } = await getNoticeList(options);
    try {
      setCardList((prevList) => [...prevList, ...items]);
      setOffset((prev) => prev + LIMIT);
      setHasNext(hasNext);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    handleLoad({ offset, limit: LIMIT });
  }, []);

  return (
    <>
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
    </>
  );
}
