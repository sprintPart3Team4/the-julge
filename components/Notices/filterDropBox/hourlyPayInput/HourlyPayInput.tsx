import { Dispatch, SetStateAction } from "react";
import classNames from "classnames/bind";

import { Filter } from "@/types/noticesType";

import styles from "./HourlyPayInput.module.scss";

const cn = classNames.bind(styles);

type Props = {
  hourlyPayGte: number | undefined;
  setFilter: Dispatch<SetStateAction<Filter>>;
};

export default function HourlyPayInput({ hourlyPayGte, setFilter }: Props) {
  const handleChangeInput = (e) => {
    setFilter((prev) => ({ ...prev, hourlyPayGte: Number(e.target.value) }));
  };

  return (
    <div className={cn("wrap")}>
      <div className={cn("inputWrap")}>
        <input
          className={cn("input")}
          type="number"
          value={hourlyPayGte === 0 ? "" : hourlyPayGte}
          placeholder="입력"
          onChange={(e) => handleChangeInput(e)}
        />
        원
      </div>
      이상부터
    </div>
  );
}
