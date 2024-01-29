import NoticeCard from "@/components/shop/noticeCard/NoticeCard";
import NoticeSuggestion from "@/components/shop/noticeSuggestion/NoticeSuggestion";
import ShopPageLayout from "@/components/shop/shopPageLayout/ShopPageLayout";

export default function ShopPage() {
  return (
    <>
      <ShopPageLayout />
      <ShopPageLayout hasNotice />
    </>
  );
}
