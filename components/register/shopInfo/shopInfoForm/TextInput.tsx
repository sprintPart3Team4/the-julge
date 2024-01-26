import { Props } from "@/components/register/shopInfo/shopInfoForm/type";
import classNames from "classnames/bind";
import styles from "@/components/register/shopInfo/shopInfoForm/shopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function TextInput(props: Props) {
  return (
    <div className={cn("inputBox")}>
      <label htmlFor={props.for} className={cn("title")}>
        {props.title}*
      </label>
      <div className={cn("wrap")}>
        <input {...props.input} placeholder="입력" />
        <span className={cn("won")}>{props.text}</span>
      </div>
    </div>
  );
}
