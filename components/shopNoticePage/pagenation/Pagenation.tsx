import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import { changePageGroup, getCurrentPageGroup } from "@/lib/pagenation";

import Previous from "@/public/images/chevron_left.svg";
import PreviousInactive from "@/public/images/chevron_left_inactive.svg";
import Next from "@/public/images/chevron_right.svg";
import NextInactive from "@/public/images/chevron_right_inactive.svg";

import styls from "./Pagenation.module.scss";
import Image from "next/image";

const cn = classNames.bind(styls);

// jsDoc 적용이 안되네..
/**
 * @param {number} numberOfTotalData - 전체 데이터의 개수
 * @param {number} limitPerSinglePage - 한 페이지에 보여줄 데이터의 개수
 * @param {number} limitPerPageGroup - 한 번에 표시할 페이지 번호의 개수
 * @param {function(number): Promise<void>} handleChangeData - 페이지 번호를 클릭하면, 그 페이지 번호를 이용해 offset을 계산해 데이터를 받아와 저장하는 함수
 */

type Props = {
  numberOfTotalData: number;
  limitPerSinglePage: number;
  limitPerPageGroup: number;
  handleChangeData: (pageNumber: number) => Promise<void>;
};

export default function Pagenation({
  numberOfTotalData,
  limitPerSinglePage,
  limitPerPageGroup,
  handleChangeData,
}: Props) {
  const totalPageNumber = Math.ceil(numberOfTotalData / limitPerSinglePage);
  const initialCurrentPageGroup = getCurrentPageGroup(limitPerPageGroup, totalPageNumber);

  const [currentPageGroup, setCurrentPageGroup] = useState(initialCurrentPageGroup);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const handlePageButtonClick = (pageNumber: number) => {
    handleChangeData(pageNumber);
    setCurrentPageNumber(pageNumber);
  };

  const moveToPreviousPageGroup = () => {
    const previous = changePageGroup("previous", limitPerPageGroup, totalPageNumber, currentPageNumber);
    setCurrentPageGroup(previous);
    setCurrentPageNumber(previous[0]);
    handleChangeData(previous[0]);
  };

  const moveToNextPageGroup = () => {
    const next = changePageGroup("previous", limitPerPageGroup, totalPageNumber, currentPageNumber);
    setCurrentPageGroup(next);
    setCurrentPageNumber(next[0]);
    handleChangeData(next[0]);
  };

  return (
    <ul className={cn("pagenationWrap")}>
      <li>
        {currentPageGroup[0] === 1 ? (
          <button className={cn("previousButton")} disabled>
            <Image src={PreviousInactive} alt="이전 페이지" width={20} height={20} />
          </button>
        ) : (
          <button className={cn("previousButton")} onClick={moveToPreviousPageGroup}>
            <Image src={Previous} alt="이전 페이지" width={20} height={20} />
          </button>
        )}
      </li>
      {currentPageGroup.map((pageNumber) => (
        <li key={pageNumber}>
          <button
            onClick={() => handlePageButtonClick(pageNumber)}
            className={cn("pageNumber", currentPageNumber === pageNumber && "current")}
          >
            {pageNumber}
          </button>
        </li>
      ))}
      <li>
        {currentPageGroup.includes(totalPageNumber) ? (
          <button className={cn("nextButton")} onClick={moveToNextPageGroup} disabled>
            <Image src={NextInactive} alt="다음 페이지" width={20} height={20} />
          </button>
        ) : (
          <button className={cn("nextButton")} onClick={moveToNextPageGroup}>
            <Image src={Next} alt="다음 페이지" width={20} height={20} />
          </button>
        )}
      </li>
    </ul>
  );
}
