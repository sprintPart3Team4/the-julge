import { Dispatch, SetStateAction } from "react";
import classNames from "classnames/bind";

import { Filter } from "@/types/noticesType";

import styles from "./StartsAtInput.module.scss";
import { getLocalTime, getToday } from "@/lib/getFullDate";

const cn = classNames.bind(styles);

type Props = {
  startsAtGte: string | undefined;
  setFilter: Dispatch<SetStateAction<Filter>>;
};

export default function StartsAtInput({ startsAtGte, setFilter }: Props) {
  const value = startsAtGte?.slice(0, 16);
  const minValue = getToday().slice(0, 16);

  const handleDateChange = (startsAt: string) => {
    const date = startsAt ? getLocalTime(startsAt) : getToday();

    setFilter((prev) => ({ ...prev, startsAtGte: date }));
  };

  return (
    <input
      className={cn("input")}
      type="datetime-local"
      value={startsAtGte ? value : minValue}
      placeholder="입력"
      min={minValue}
      onChange={(e) => handleDateChange(e.target.value)}
    />
  );
}
