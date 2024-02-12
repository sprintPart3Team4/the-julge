import { useRouter } from "next/router";
import Footer from "@/components/common/footer/Footer";
import NavBar from "@/components/common/navBar/NavBar";
import ShopPageLayout from "@/components/shop/shopPageLayout/ShopPageLayout";
import { useAuth } from "@/contexts/AuthProvider";

export default function ShopPage() {
  const router = useRouter();

  const handleEditClick = () => {
    router.push("/edit");
  };

  const handleRegisterClick = () => {
    router.push("/shop/NoticeRegister");
  };

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
