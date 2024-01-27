import { Props } from "@/components/register/shopInfo/shopInfoForm/type";
import { Item } from "@/components/register/shopInfo/shopInfoForm/type";
import classNames from "classnames/bind";
import styles from "@/components/register/shopInfo/shopInfoForm/shopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function Input({ title, item } : Props) {
  const items = item || [];

  return (
    <div className={cn("inputBox")}>
      <p className={cn("title")}>{title}</p>
      <label htmlFor="shopName" className={cn("option")}>
        선택<span className={cn("dropdownOpen")}>열기</span>
      </label>
      <ul>
        {items.map((item: Item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}