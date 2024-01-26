import styles from "./NoticeSuggestion.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function NoticeSuggestion() {
  return (
    <div className={cn("container")}>
      <span>공고를 등록해 보세요.</span>
      <button>공고 등록하기</button>
    </div>
  );
}
