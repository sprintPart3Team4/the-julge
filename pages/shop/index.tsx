import { useRouter } from "next/router";
import Footer from "@/components/common/footer/Footer";

import NavBar from "@/components/common/navBar/NavBar";
// import NoticeRegister from "@/components/register/notice/NoticeRegister/NoticeRegister";
// import NoticeCard from "@/components/shop/noticeCard/NoticeCard";
// import RegisterSuggestion from "@/components/shop/registerSuggestion/RegisterSuggestion";
import ShopPageLayout from "@/components/shop/shopPageLayout/ShopPageLayout";
import getCookies from "@/lib/getCookies";
import instance from "@/lib/axiosInstance";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";

export default function ShopPage() {
  const router = useRouter();

  const handleEditClick = () => {
    router.push("/edit");
  };

  const handleRegisterClick = () => {
    router.push("/shop/NoticeRegister");
  };

  // const checkHasNotice = async () => {
  //   const res = await instance.get("notices");
  //   const noticeArray = res.data.items;
  //   return noticeArray.length ? true : false;
  // };

  const { user, shop } = useAuth();
  const hasShop = Boolean(user?.shop);
  let hasNotice = Boolean(shop?.id);

  return (
    <>
      <NavBar />
      <ShopPageLayout
        hasShop={hasShop}
        hasNotice={hasNotice}
        handleEditClick={handleEditClick}
        handleRegisterClick={handleRegisterClick}
      />
      <Footer />
    </>
  );
}
