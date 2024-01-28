import classNames from "classnames/bind";
import styles from "./MainTitle.module.scss";

const cn = classNames.bind(styles);

type Props = {
  mainTitle: string;
};

export default function MainTitle({ mainTitle }: Props) {
  return <h2 className={cn("mainTitle")}>{mainTitle}</h2>;
}
