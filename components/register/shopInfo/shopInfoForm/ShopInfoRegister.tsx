import { useState } from "react";
import ShopInfoTitle from "../shopInfoTitle/ShopInfoTitle";
import ShopInfoForm from "./shopInfoForm";
import ShopPageLayout from "@/components/shop/shopPageLayout/ShopPageLayout";
import classNames from "classnames/bind";
import styles from "./ShopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function ShopInfoRegister() {
  const [isPageOpen, setIsPageOpen] = useState<boolean>(false);

  const handleYesButtonClick = () => {
    setIsPageOpen(true);
  };

  return (
    <>
      {!isPageOpen ? (
        <div className={cn("wrapper")}>
          <ShopInfoTitle title="가게 정보" handleYesButtonClick={handleYesButtonClick} isPageOpen={!isPageOpen}/>
          <ShopInfoForm />
        </div>
      ) : (
        <ShopPageLayout />
      )}
    </>
  );
}
