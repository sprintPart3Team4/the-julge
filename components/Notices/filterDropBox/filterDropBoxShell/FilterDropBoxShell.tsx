import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import FilterTitle from "../filterTitle/FilterTitle";
import FilterAddress from "../filterAddress/FilterAddress";
import SelectedAddress from "../selectedAddress/SelectedAddress";
import HourlyPayInput from "../hourlyPayInput/HourlyPayInput";
import StartsAtInput from "../startsAtInput/StartsAtInput";
import Button from "@/components/common/button/Button";

import { Filter } from "@/types/noticesType";
import { initailFilter } from "@/lib/NoticesConstants";

import styles from "./FilterDropBoxShell.module.scss";

const cn = classNames.bind(styles);

type Props = {
  countValue: string[] | undefined;
  setFilter: Dispatch<SetStateAction<Filter>>;
  handleFilterButtonClick: () => void;
  children: ReactNode;
};

export default function FilterDropBoxShell({ countValue, setFilter, handleFilterButtonClick, children }: Props) {
  const dropboxRef = useRef<HTMLDivElement>(null);
  const [isDropBoxOpen, setIsDropBoxOpen] = useState(false);

  const count = countValue ? countValue.length : 0;

  const handleDropBoxToggle = () => setIsDropBoxOpen((prev) => !prev);
  const handleDropBoxClose = () => setIsDropBoxOpen(false);

  const resetFilter = () => {
    setFilter(() => initailFilter);
  };

  useEffect(() => {
    const handleDropboxClose = (e: MouseEvent) => {
      if (e.target instanceof Node && dropboxRef.current && !dropboxRef.current.contains(e.target)) {
        setIsDropBoxOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDropboxClose);

    return () => {
      document.removeEventListener("mousedown", handleDropboxClose);
    };
  }, []);

  const handleFilterSubmit = () => {
    setIsDropBoxOpen(false);
    handleFilterButtonClick();
  };

  return (
    <div className={cn("wrap")} ref={dropboxRef}>
      <button className={cn("openBox")} onClick={handleDropBoxToggle}>{`상세 필터 (${count})`}</button>
      {isDropBoxOpen && (
        <div className={cn("dropboxWrap", isDropBoxOpen && "opened")}>
          <header className={cn("header")}>
            <h3>상세 필터</h3>
            <span className={cn("closeIcon")} onClick={handleDropBoxClose}>
              닫기
            </span>
          </header>
          <section className={cn("section")}>{children}</section>
          <footer className={cn("footer")}>
            <Button text="초기화" size="flexible" color="secondary" handleButtonClick={resetFilter} />
            <Button text="적용하기" size="flexible" color="primary" handleButtonClick={handleFilterSubmit} />
          </footer>
        </div>
      )}
    </div>
  );
}

FilterDropBoxShell.FilterTitle = FilterTitle;
FilterDropBoxShell.AddressBox = FilterAddress;
FilterDropBoxShell.SelectedAddress = SelectedAddress;
FilterDropBoxShell.HourlyPayInput = HourlyPayInput;
FilterDropBoxShell.StartsAtInput = StartsAtInput;
