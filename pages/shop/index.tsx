import Footer from "@/components/common/footer/Footer";
import NoticeRegister from "@/components/register/notice/NoticeRegister/NoticeRegister";
import ShopInfoForm from "@/components/register/shopInfo/shopInfoForm/shopInfoForm";
import NoticeCard from "@/components/shop/noticeCard/NoticeCard";
import RegisterSuggestion from "@/components/shop/registerSuggestion/RegisterSuggestion";
import ShopPageLayout from "@/components/shop/shopPageLayout/ShopPageLayout";
import { useState } from "react";

export default function ShopPage() {
  const [isInfoRegisterOpen, setIsInfoRegisterOpen] = useState<boolean>(false);
  const [isNoticeRegisterOpen, setIsNoticeRegisterOpen] = useState<boolean>(false);

  const toggleInfoOpen = () => {
    setIsInfoRegisterOpen(!isInfoRegisterOpen);
  };

  const toggleNoticeOpen = () => {
    setIsNoticeRegisterOpen(!isNoticeRegisterOpen);
  };

  return (
    <>
      {isInfoRegisterOpen ? (
        <ShopInfoForm toggleInfoOpen={toggleInfoOpen} />
      ) : isNoticeRegisterOpen ? (
        <NoticeRegister toggleNoticeOpen={toggleNoticeOpen} />
      ) : (
        <>
          <ShopPageLayout
            hasShop
            hasNotice
            toggleInfoOpen={toggleInfoOpen}
            toggleNoticeOpen={toggleNoticeOpen}
          />
          <Footer />
        </>
      )}
    </>
  );
}
