import { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "@/components/register/shopInfo/shopInfoTitle/ShopInfoTitle.module.scss";

const cn = classNames.bind(styles);

export default function ShopInfoTitle({ children }: { children: ReactNode }) {
  return (
    <div className={cn("container")}>
      <h2 className={cn("title")}>{children}</h2>
      <button className={cn("buttonCancel")} type="button">
        취소
      </button>
    </div>
  );
}
