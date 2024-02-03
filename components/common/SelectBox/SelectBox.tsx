import { MouseEvent } from "react";
import { SelectBox, Item } from "@/components/register/shopInfo/shopInfoForm/type";
import classNames from "classnames/bind";
import styles from "@/components/register/shopInfo/shopInfoForm/ShopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function SelectBox({ label, title, item, defaultValue, setFormValues }: SelectBox) {
  const items = item || [];
  const isSelected = defaultValue !== "선택";
  
  const handleOpenClick = (e: MouseEvent<HTMLDivElement>) => e.currentTarget.classList.toggle(cn("active"));

  const handleOptionClick = (item: string) => {
    setFormValues((prev) => ({
      ...prev,
      [label]: item,
    }));
  };

  return (
    <div className={cn("inputBox")} onClick={handleOpenClick}>
      <p className={cn("title")}>{title}</p>
      <label htmlFor={label} className={cn("option", { active: isSelected })}>
        {defaultValue}
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
