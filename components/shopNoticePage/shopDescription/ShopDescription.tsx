import classNames from "classnames/bind";
import styles from "./ShopDescription.module.scss";

const cn = classNames.bind(styles);

type Props = {
  description: string;
};

export default function ShopDescription({ description }: Props) {
  return <p className={cn("description")}>{description}</p>;
}
