import classNames from "classnames/bind";
import styles from "./NoticeSuggestion.module.scss";

const cn = classNames.bind(styles);

export default function NoticeSuggestion() {
  return (
    <div className={cn("wrap")}>
      <span>공고를 등록해 보세요.</span>
      <button>공고 등록하기</button>
    </div>
  );
}
