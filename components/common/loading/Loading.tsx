import classNames from "classnames/bind";
import styles from "./Loading.module.scss";

const cn = classNames.bind(styles);

export default function Loading() {
  return (
    <div className={cn("container")}>
      <div className={cn("spinner")}></div>
      <p className={cn("message")}>잠시만 기다려 주세요 ...</p>
    </div>
  );
}
