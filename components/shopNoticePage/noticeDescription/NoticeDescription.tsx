import classNames from "classnames/bind";
import styles from "./NoticeDescription.module.scss";

const cn = classNames.bind(styles);

type Props = {
  noticeDescription: string;
};

export default function NoticeDescription({ noticeDescription }: Props) {
  return (
    <div className={cn("container")}>
      <h3 className={cn("title")}>공고 설명</h3>
      <p className={cn("description")}>{noticeDescription}</p>
    </div>
  );
}
