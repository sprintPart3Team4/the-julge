import NoticeCard from "@/components/shop/noticeCard/NoticeCard";
import RegisterSuggestion from "@/components/shop/registerSuggestion/RegisterSuggestion";
import ShopPageLayout from "@/components/shop/shopPageLayout/ShopPageLayout";

export default function ShopPage() {
  return (
    <>
      <ShopPageLayout />
      <ShopPageLayout hasNotice />
    </>
  );
}
