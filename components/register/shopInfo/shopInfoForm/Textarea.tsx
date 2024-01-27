import { Props } from "@/components/register/shopInfo/shopInfoForm/type";
import classNames from "classnames/bind";
import styles from "@/components/register/shopInfo/shopInfoForm/ShopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function Textarea({ label, title, textarea }: Props) {
  return (
    <div className={cn("inputBox", "textarea")}>
      <label htmlFor={label} className={cn("title")}>
        {title}
      </label>
      <textarea {...textarea} className={cn("desc")} placeholder="입력"></textarea>
    </div>
  );
}
