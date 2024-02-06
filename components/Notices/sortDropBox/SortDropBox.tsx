import { useState } from "react";
import classNames from "classnames/bind";

import styles from "./SortDropBox.module.scss";

const cn = classNames.bind(styles);

type Item = {
  id: string;
  name: string;
};

type Props = {
  list: Item[];
  selectedItem: Item;
  handleSortButtonClick: (e: any) => void;
};

export default function SortDropBox({ list, selectedItem, handleSortButtonClick }: Props) {
  const [isDropBoxOpen, setIsDropBoxOpen] = useState(false);

  const handleDropBoxOpen = () => setIsDropBoxOpen((prev) => !prev);
  const handleDropBoxBlur = () => {
    setTimeout(() => {
      setIsDropBoxOpen(false);
    }, 100);
  };
  const handleSelectSort = (e) => {
    setIsDropBoxOpen(false);
    handleSortButtonClick(e);
  };

  return (
    <div className={cn("container")} onBlur={handleDropBoxBlur}>
      <button className={cn("defaultValue")} onClick={handleDropBoxOpen}>
        {selectedItem.name}
        <span className={cn("icon", isDropBoxOpen ? "closeIcon" : "openIcon")}>열기</span>
      </button>
      {isDropBoxOpen && (
        <ul className={cn("dropdown", isDropBoxOpen && "opened")}>
          {list.map(({ id, name }) => (
            <li className={cn("dropdownItem")} key={id}>
              <button value={id} onClick={handleSelectSort}>
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
