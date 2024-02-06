import { Dispatch, SetStateAction } from "react";
import classNames from "classnames/bind";

import { Filter } from "@/types/noticesType";

import styles from "./StartsAtInput.module.scss";
const cn = classNames.bind(styles);

type Props = {
  startsAtGte: string | undefined;
  setFilter: Dispatch<SetStateAction<Filter>>;
};

export default function StartsAtInput({ startsAtGte, setFilter }: Props) {
  const handleDateChange = (e) => {
    const date = new Date(e.target.value).toISOString();
    setFilter((prev) => ({ ...prev, startsAtGte: date }));
  };

  return (
    <input
      className={cn("input")}
      type="datetime-local"
      value={startsAtGte ? startsAtGte : ""}
      placeholder="입력"
      onChange={(e) => handleDateChange(e)}
    />
  );
}
