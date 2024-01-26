import { Props } from "@/components/register/shopInfo/shopInfoForm/type";
import classNames from "classnames/bind";
import styles from "@/components/register/shopInfo/shopInfoForm/shopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function Textarea(props: Props) {
  return (
    <div className={cn("inputBox")}>
      <label htmlFor={props.for} className={cn("title")}>
        {props.title}
      </label>
      <textarea {...props.textarea} className={cn("desc")} placeholder="입력"></textarea>
    </div>
  );
}
