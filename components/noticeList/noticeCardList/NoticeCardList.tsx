import classNames from "classnames/bind";
import { NoticeList } from "@/types/noticesType";
import styles from "./NoticeCardList.module.scss";
import NoticeCard from "../noticeCard/noticeCard";
import getCookies from "@/lib/getCookies";
import instance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

const cn = classNames.bind(styles);

type Props = {
  noticeList: NoticeList;
};

export default function NoticeCardList({ noticeList }: Props) {
  const { shopId: myShopId } = getCookies();

  return (
    <div className={cn("wrap")}>
      {noticeList?.map(
        ({
          item: {
            id: noticeId,
            startsAt,
            workhour,
            hourlyPay,
            closed,
            shop: {
              item: { id: noticeShopId, imageUrl, name, address1, originalHourlyPay },
            },
          },
        }) => {
          const noticeCardProps = {
            noticeId,
            startsAt,
            workhour,
            hourlyPay,
            closed,
            noticeShopId,
            myShopId,
            imageUrl,
            name,
            address1,
            originalHourlyPay,
          };

          return <NoticeCard key={noticeId} {...noticeCardProps} />;
        }
      )}
    </div>
  );
}
