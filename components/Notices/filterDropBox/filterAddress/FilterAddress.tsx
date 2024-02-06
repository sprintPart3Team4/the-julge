import classNames from "classnames/bind";
import { Dispatch, SetStateAction } from "react";

import { ADDRESS } from "@/lib/NoticesConstants";
import { Filter } from "@/types/noticesType";

import styles from "./FilterAddress.module.scss";

const cn = classNames.bind(styles);

type Props = {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
};

export default function FilterAddress({ filter, setFilter }: Props) {
  const handleButtonClick = (add: string) => {
    if (!filter.address?.includes(add)) {
      setFilter((prev) => ({ ...prev, address: [...prev.address, add] }));
    }
  };
  return (
    <div className={cn("addressWrap")}>
      <div className={cn("totalAddress")}>
        {ADDRESS.map((add) => (
          <button className={cn("address")} key={add} value={add} onClick={() => handleButtonClick(add)}>
            {add}
          </button>
        ))}
      </div>
    </div>
  );
}
