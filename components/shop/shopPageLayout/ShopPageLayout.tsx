import classNames from "classnames/bind";
import MyShopProfile from "@/components/shop/myShopProfile/MyShopProfile";
import NoticeCard from "@/components/shop/noticeCard/NoticeCard";
import NoticeSuggestion from "@/components/shop/registerSuggestion/RegisterSuggestion";
import NoticeCardList from "../noticeCardList/NoticeCardList";
import styles from "./ShopPageLayout.module.scss";

const cn = classNames.bind(styles);

type ShopPageLayoutProps = {
  hasNotice?: boolean;
};

export default function ShopPageLayout({ hasNotice }: ShopPageLayoutProps) {
  return (
    <div className={cn("wrap")}>
      <section>
        <h2>내 가게</h2>
        <MyShopProfile />
      </section>
      <section>
        <h2>{hasNotice ? "내가 등록한 공고" : "등록한 공고"}</h2>
        {hasNotice ? <NoticeCardList /> : <NoticeSuggestion type="notice" />}
      </section>
    </div>
  );
}
