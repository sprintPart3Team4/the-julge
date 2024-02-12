import { useRouter } from "next/router";
import Footer from "@/components/common/footer/Footer";

import NavBar from "@/components/common/navBar/NavBar";
import NoticeRegister from "@/components/register/notice/NoticeRegister/NoticeRegister";
import NoticeCard from "@/components/shop/noticeCard/NoticeCard";
import RegisterSuggestion from "@/components/shop/registerSuggestion/RegisterSuggestion";
import ShopPageLayout from "@/components/shop/shopPageLayout/ShopPageLayout";

export default function ShopPage() {
  const router = useRouter();

  const handleEditClick = () => {
    router.push("/edit");
  };

  const handleRegisterClick = () => {
    router.push("/shop/NoticeRegister");
  };

  return (
    <>
      <NavBar />
      <ShopPageLayout hasShop hasNotice handleEditClick={handleEditClick} handleRegisterClick={handleRegisterClick} />
      <Footer />
    </>
  );
}
