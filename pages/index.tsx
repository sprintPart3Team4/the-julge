// 공고 리스트 페이지
import ShopInfoForm from "@/components/register/shopInfo/shopInfoForm/shopInfoForm";
import ShopInfoTitle from "@/components/register/shopInfo/shopInfoTitle/ShopInfoTitle";
export default function Home() {
  return (
    <>
      <main>메인페이지</main>
      <ShopInfoTitle title="가게정보"/>
      <ShopInfoForm />
    </>
  );
}
