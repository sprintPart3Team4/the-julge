import classNames from "classnames/bind";
import styles from "./SubTitle.module.scss";

const cn = classNames.bind(styles);

type Props = {
  subTitle: string;
};

export default function subTitle({ subTitle }: Props) {
  return <h3 className={cn("subTitle")}>{subTitle}</h3>;
}
