import classNames from "classnames/bind";
import styles from "./CustomNotice.module.scss";

const cn = classNames.bind(styles);

export default function CustomNotice() {
  return(
    <div className={cn("wrapper")}></div>
  )
}