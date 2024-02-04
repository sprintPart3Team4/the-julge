import classNames from "classnames/bind";
import MyShopProfile from "@/components/shop/myShopProfile/MyShopProfile";
import NoticeCardList from "../noticeCardList/NoticeCardList";
import RegisterSuggestion from "@/components/shop/registerSuggestion/RegisterSuggestion";
import styles from "./ShopPageLayout.module.scss";

const cn = classNames.bind(styles);

type ShopPageLayoutProps = {
  hasShop?: boolean;
  hasNotice?: boolean;
  handleEditClick: () => void;
  toggleNoticeOpen: () => void;
};

export default function ShopPageLayout({ hasShop, hasNotice, handleEditClick, toggleNoticeOpen }: ShopPageLayoutProps) {
  return (
    <div className={cn("wrap")}>
      <section>
        <h2>내 가게</h2>
        {hasShop ? (
          <MyShopProfile handleEditClick={handleEditClick} toggleNoticeOpen={toggleNoticeOpen} />
        ) : (
          <RegisterSuggestion type="shop" />
        )}
      </section>
      {hasShop && (
        <section>
          <h2>{hasNotice ? "내가 등록한 공고" : "등록한 공고"}</h2>
          {hasNotice ? <NoticeCardList /> : <RegisterSuggestion type="notice" />}
        </section>
      )}
    </div>
  );
}
