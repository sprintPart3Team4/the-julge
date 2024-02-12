import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "@/components/common/footer/Footer";
import NavBar from "@/components/common/navBar/NavBar";
import ShopPageLayout from "@/components/shop/shopPageLayout/ShopPageLayout";
import { useAuth } from "@/contexts/AuthProvider";
import instance from "@/lib/axiosInstance";

export default function ShopPage() {
  const [hasNotice, setHasNotice] = useState<boolean>(false);

  const router = useRouter();

  const handleEditClick = () => {
    router.push("/edit");
  };

  const handleRegisterClick = () => {
    router.push("/shop/NoticeRegister");
  };

  const { user, shop } = useAuth();
  const hasShop = Boolean(user?.shop);

  const checkHasShop = async (shopId: string | undefined) => {
    const res = await instance.get(`shops/${shopId}/notices`);
    const result = res.data.items.length ? true : false;
    setHasNotice(result);
  };

  useEffect(() => {
    if (shop) {
      checkHasShop(shop.id);
    }
  }, []);

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
