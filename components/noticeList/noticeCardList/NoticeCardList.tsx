import classNames from "classnames/bind";
import NoticeCard from "../../shop/noticeCard/NoticeCard";
import { NoticeList } from "@/lib/getNotices";
import styles from "./NoticeCardList.module.scss";

const cn = classNames.bind(styles);

type Props = {
  noticeList: NoticeList;
};

export default function NoticeCardList({ noticeList }: Props) {
  return (
    <div className={cn("wrap")}>
      {noticeList?.map(
        ({
          item: {
            id,
            hourlyPay,
            startsAt,
            workhour,
            shop: {
              item: { name, address1 },
            },
          },
        }) => {
          return (
            <NoticeCard
              key={id}
              startsAt={startsAt}
              workhour={workhour}
              hourlyPay={hourlyPay}
              // closed={card.item.closed}
            />
          );
        }
      )}
    </div>
  );
}
