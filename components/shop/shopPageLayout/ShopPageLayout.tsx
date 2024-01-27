import classNames from "classnames/bind";
import MyShopProfile from "@/components/shop/myShopProfile/MyShopProfile";
import NoticeCard from "@/components/shop/noticeCard/NoticeCard";
import NoticeSuggestion from "@/components/shop/noticeSuggestion/NoticeSuggestion";
import styles from "./ShopPageLayout.module.scss";

const cn = classNames.bind(styles);

export default function ShopPageLayout() {
  return (
    <div className={cn("container")}>
      <MyShopProfile />
    </div>
  );
}
