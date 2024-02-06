import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import NoticeCard from "@/components/noticeList/noticeCard/noticeCard";
import instance from "@/lib/axiosInstance";
import getCookies from "@/lib/getCookies";
import styles from "./CustomNotice.module.scss";

const cn = classNames.bind(styles);

export default function CustomNotice() {
  const [customList, setCustomList] = useState([]);

  useEffect(() => {
    async function getData() {
      const dataList = (await instance.get(`notices?sort=time`)).data.items;
      setCustomList(dataList);
    }
    getData();
  }, []);

  console.log(customList);

  return (
    <div className={cn("wrapper")}>
      <div className={cn("contentWrapper")}>
        <p className={cn("title")}>맞춤 공고</p>
        <div className={cn("noticeCardList")}>
          {customList.map((card: any, index: any) => (
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
