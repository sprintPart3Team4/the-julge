import MyShopProfile from "@/components/shop/myShopProfile/MyShopProfile";
import NoticeCard from "@/components/shop/noticeCard/NoticeCard";
import NoticeSuggestion from "@/components/shop/noticeSuggestion/NoticeSuggestion";

export default function ShopPage() {
  return (
    <div>
      <h1>1. 내 가게 컴포넌트</h1>
      <MyShopProfile />
      <h1>2. 공고 카드 컴포넌트</h1>
      <NoticeCard />
      <h2>* 마감 시</h2>
      <NoticeCard closed />
      <h1>3. 등록한 공고가 없을 시</h1>
      <NoticeSuggestion />
    </div>
  );
}
