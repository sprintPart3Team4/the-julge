import { useState, MouseEvent } from "react";
import { Props } from "@/components/register/shopInfo/shopInfoForm/type";
import { Item } from "@/components/register/shopInfo/shopInfoForm/type";
import classNames from "classnames/bind";
import styles from "@/components/register/shopInfo/shopInfoForm/shopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function Input({ title, item }: Props) {
  const items = item || [];
  const [optionValues, setOptionValues] = useState<string>("선택");
  const [isSelected, setIsSelected] = useState<string>("");

  const handleOpenClick = (e: MouseEvent<HTMLDivElement>) => e.currentTarget.classList.toggle(cn("active"));

  const handleOptionClick = (item: string) => {
    setOptionValues(item);
    setIsSelected("active");
  };

  return (
    <div className={cn("inputBox")} onClick={handleOpenClick}>
      <p className={cn("title")}>{title}</p>
      <label htmlFor="shopName" className={cn("option", isSelected)}>
        {optionValues}
        <span className={cn("dropdownOpen")}>열기</span>
      </label>
      <ul>
        {items.map((item: Item) => (
          <li key={item.id} onClick={() => handleOptionClick(item.name)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
