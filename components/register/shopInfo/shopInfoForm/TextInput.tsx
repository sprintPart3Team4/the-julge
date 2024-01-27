import { Props } from "@/components/register/shopInfo/shopInfoForm/type";
import classNames from "classnames/bind";
import styles from "@/components/register/shopInfo/shopInfoForm/shopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function TextInput({ label, title, input, text}: Props) {
  return (
    <div className={cn("inputBox")}>
      <label htmlFor={label} className={cn("title")}>
        {title}*
      </label>
      <div className={cn("wrap")}>
        <input {...input} placeholder="입력" />
        <span className={cn("won")}>{text}</span>
      </div>
    </div>
  );
}
