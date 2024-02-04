import ShopInfoForm from "./shopInfoForm";
import ShopInfoTitle from "../shopInfoTitle/ShopInfoTitle";
import { useAuth } from "@/contexts/AuthProvider";
import classNames from "classnames/bind";
import styles from "./ShopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function ShopInfoEdit() {
  const { shop } = useAuth();

  return (
    <>
      <div className={cn("wrapper")}>
        <ShopInfoTitle title="가게 정보" />
        <ShopInfoForm {...shop} />;
      </div>
    </>
  );
}
