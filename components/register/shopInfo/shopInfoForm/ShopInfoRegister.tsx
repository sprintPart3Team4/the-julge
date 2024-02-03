import ShopInfoTitle from "../shopInfoTitle/ShopInfoTitle";
import classNames from "classnames/bind";
import styles from "./ShopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function ShopInfoRegister() {
  return (
    <div className={cn("wrapper")}>
      <ShopInfoTitle title="가게 정보" />
    </div>
  );
}
