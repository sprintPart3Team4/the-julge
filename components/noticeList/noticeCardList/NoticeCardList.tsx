import classNames from "classnames/bind";
import NoticeCard from "../../shop/noticeCard/NoticeCard";
import { NoticeList } from "@/types/noticesType";
import styles from "./NoticeCardList.module.scss";

const cn = classNames.bind(styles);

type Props = {
  noticeList: NoticeList;
};

export default function NoticeCardList({ noticeList }: Props) {
  return (
    <div className={cn("wrap")}>
      {noticeList?.map(({ item: { id, startsAt, workhour, hourlyPay, closed } }) => {
        return <NoticeCard key={id} startsAt={startsAt} workhour={workhour} hourlyPay={hourlyPay} closed={closed} />;
      })}
    </div>
  );
}
