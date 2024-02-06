import Image from "next/image";
import { useState } from "react";
import classNames from "classnames/bind";

import Open from "@/public/images/dropdown_open.svg";
import Close from "@/public/images/dropdown_close.svg";

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
        {isDropBoxOpen ? (
          <Image src={Open} alt="닫기" width={10} height={10} />
        ) : (
          <Image src={Close} alt="열기" width={10} height={10} />
        )}
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
