import Footer from "@/components/common/footer/Footer";
import NoticeRegister from "@/components/register/notice/NoticeRegister/NoticeRegister";
import NoticeCard from "@/components/shop/noticeCard/NoticeCard";
import RegisterSuggestion from "@/components/shop/registerSuggestion/RegisterSuggestion";
import ShopPageLayout from "@/components/shop/shopPageLayout/ShopPageLayout";
import { useState } from "react";

export default function ShopPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return isRegisterOpen ? (
    <NoticeRegister setIsRegisterOpen={setIsRegisterOpen} />
  ) : (
    <>
      <ShopPageLayout hasShop hasNotice setIsRegisterOpen={setIsRegisterOpen} />
      <Footer />
    </>
  );
}