import React from "react";
import classNames from "classnames/bind";
import NoticeCardList from "@/components/noticeList/noticeCardList/NoticeCardList";
import { NoticeList } from "@/types/noticesType";
import styles from "./NoticeListLayout.module.scss";

// import NoticeCardList from "../shop/noticeCardList/NoticeCardList";

const cn = classNames.bind(styles);

type Props = {
  keyword: string;
  noticeList: NoticeList;
};

export default function NoticeListLayout({ keyword, noticeList }: Props) {
  const LIMIT_PER_SINGLE_PAGE = 30; // 한 페이지에 보여줄 데이터의 개수
  const LIMIT_PER_PAGE_GROUP = 5; // 한 번에 보여줄 페이지 번호의 개수

  return (
    <section className={cn("wrap")}>
      <div className={cn("title")}>
        {keyword ? (
          <h2>
            <span>{keyword}</span>에 대한 공고 목록
          </h2>
        ) : (
          <h2>전체 공고</h2>
        )}
        <div className={cn("controls")}>
          <button>마감임박순</button>
          <button>상세필터</button>
        </div>
      </div>
      <NoticeCardList noticeList={noticeList} />
    </section>
  );
}
