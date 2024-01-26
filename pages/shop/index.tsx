import MyShopProfile from "@/components/shop/my-shop-profile/MyShopProfile";
import NoticeCard from "@/components/shop/notice-card/NoticeCard";

export default function ShopPage() {
  return (
    <div>
      <h1>내 가게 컴포넌트</h1>
      <MyShopProfile />
      <h1>공고 카드 컴포넌트</h1>
      <NoticeCard closed />
      <NoticeCard />
    </div>
  );
}
