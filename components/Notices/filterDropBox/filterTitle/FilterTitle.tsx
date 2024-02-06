import classNames from "classnames/bind";

import styles from "./FilterTitle.module.scss";

const cn = classNames.bind(styles);

type Props = {
  text: string;
};

export default function FilterTitle({ text }: Props) {
  return <h3 className={cn("sectionTitle")}>{text}</h3>;
}
