import Footer from "@/components/common/footer/Footer";
import NoticeRegister from "@/pages/shop/NoticeRegister";
import ShopInfoForm from "@/components/register/shopInfo/shopInfoForm/shopInfoForm";
import NoticeCard from "@/components/shop/noticeCard/NoticeCard";
import RegisterSuggestion from "@/components/shop/registerSuggestion/RegisterSuggestion";
import ShopPageLayout from "@/components/shop/shopPageLayout/ShopPageLayout";
import { useState } from "react";

export default function ShopPage() {
  return (
    <>
      <ShopPageLayout hasShop hasNotice />
      <Footer />
    </>
  );
}
