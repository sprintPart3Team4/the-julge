import { Input } from "@/components/register/shopInfo/shopInfoForm/type";
import classNames from "classnames/bind";
import styles from "./ShopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function TextInput({ label, title, input, text, defaultValue, onChange }: Input) {
  return (
    <div className={cn("inputBox")}>
      <label htmlFor={label} className={cn("title")}>
        {title}*
      </label>
      <div className={cn("wrap")}>
        <input {...input} placeholder="0" defaultValue={defaultValue} onChange={onChange} />
        <span className={cn("won")}>{text}</span>
      </div>
    </div>
  );
}
