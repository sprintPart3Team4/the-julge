import classNames from "classnames/bind";
import NoticeCard from "../noticeCard/NoticeCard";
import styles from "./NoticeCardList.module.scss";

const cn = classNames.bind(styles);

export default function NoticeCardList() {
  return (
    // api 구현 후 map 메소드 사용하여 나열 예정
    <div className={cn("wrap")}>
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
    </div>
  );
}
