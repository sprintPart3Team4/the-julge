import classNames from "classnames/bind";
import { NoticeList } from "@/types/noticesType";
import styles from "./NoticeCardList.module.scss";
import NoticeCard from "../noticeCard/noticeCard";

const cn = classNames.bind(styles);

type Props = {
  noticeList: NoticeList;
};

export default function NoticeCardList({ noticeList }: Props) {
  return (
    <div className={cn("wrap")}>
      {noticeList?.map(({ item: { id, startsAt, workhour, hourlyPay, closed, shop } }) => {
        const noticeCardProps = {
          id,
          startsAt,
          workhour,
          hourlyPay,
          closed,
          shop,
        };
        return <NoticeCard key={id} {...noticeCardProps} />;
      })}
    </div>
  );
}
