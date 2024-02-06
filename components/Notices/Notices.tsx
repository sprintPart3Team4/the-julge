import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import SortDropBox from "./sortDropBox/SortDropBox";
import FilterDropBoxShell from "./filterDropBox/filterDropBoxShell/FilterDropBoxShell";
import Pagenation from "../shopNoticePage/pagenation/Pagenation";

import { getNotices } from "@/lib/getNotices";
import { initailFilter, SORT } from "@/lib/NoticesConstants";
import { Filter, NoticeList } from "@/types/noticesType";

import styles from "./Notices.module.scss";

const cn = classNames.bind(styles);

type Props = {
  keyword?: string;
};

export default function Notices({ keyword }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  // 보여 줄 데이터 저장
  const [noticeList, setNoticeList] = useState<NoticeList>();

  // 상세필터
  const [filter, setFilter] = useState<Filter>(initailFilter);
  // 정렬
  const initailSort = SORT[0];
  const [sort, setSort] = useState(initailSort);
  // 페이지네이션
  const [count, setCount] = useState(0);

  const LIMIT_PER_SINGLE_PAGE = 5; // 한 페이지에 보여줄 데이터의 개수
  const LIMIT_PER_PAGE_GROUP = 5; // 한 번에 보여줄 페이지 번호의 개수

  useEffect(() => {
    try {
      getNotices(0, LIMIT_PER_SINGLE_PAGE, keyword).then(({ count, items }) => {
        setCount(count);
        setNoticeList(items);
      });
    } finally {
      setSort(initailSort);
      setFilter(initailFilter);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <div>로딩 중</div>;

  // 상세 필터를 적용하면, 키워드는 유지되지만, 정렬, 페이지네이션은 초기화!
  // 시간 포맷을 RFC3339로 바꾸는 것도 아직 미적용해서 시간을 보낼 경우 오류가 남.
  const handleFilterButtonClick = async () => {
    const { address, startsAtGte, hourlyPayGte } = filter;
    const res = await getNotices(0, LIMIT_PER_SINGLE_PAGE, keyword, address, startsAtGte, hourlyPayGte);
    const { count, items } = res;

    setCount(count);
    setNoticeList(items);
    setSort(initailSort);
  };

  // 정렬하면, 저장된 검색어와 상세필터를 유지한 채 API 요청, 페이지네이션은 초기화
  // todo: 이벤트 타입 설정
  const handleSortButtonClick = async (e) => {
    const sortId = e.target.value;
    const sortName = e.target.innerText;
    setSort({ id: sortId, name: sortName });

    const { address, startsAtGte, hourlyPayGte } = filter;

    const res = await getNotices(0, LIMIT_PER_SINGLE_PAGE, keyword, address, startsAtGte, hourlyPayGte, sortId);
    const { count, items } = res;

    setCount(count);
    setNoticeList(items);
  };

  // 페이지네이션
  const handleChangeData = async (pageNumber: number) => {
    const offset = (pageNumber - 1) * LIMIT_PER_SINGLE_PAGE;
    const { address, startsAtGte, hourlyPayGte } = filter;
    const res = await getNotices(offset, LIMIT_PER_SINGLE_PAGE, keyword, address, startsAtGte, hourlyPayGte, sort.id);
    const { count, items } = res;

    setCount(count);
    setNoticeList(items);
  };

  return (
    <div>
      {/* 정렬 & 상세 필터 */}
      <div className={cn("sortAndFilter")}>
        <SortDropBox list={SORT} selectedItem={sort} handleSortButtonClick={handleSortButtonClick} />
        <FilterDropBoxShell
          countValue={filter.address}
          setFilter={setFilter}
          handleFilterButtonClick={handleFilterButtonClick}
        >
          <div className={cn("address")}>
            <FilterDropBoxShell.FilterTitle text="위치" />
            <FilterDropBoxShell.AddressBox setFilter={setFilter} />
            {filter.address?.length !== 0 && (
              <FilterDropBoxShell.SelectedAddress address={filter.address} setFilter={setFilter} />
            )}
          </div>
          <div className={cn("line")}></div>
          <div className={cn("startsAt")}>
            <FilterDropBoxShell.FilterTitle text="시작일" />
            <FilterDropBoxShell.StartsAtInput startsAtGte={filter.startsAtGte} setFilter={setFilter} />
          </div>
          <div className={cn("line")}></div>
          <div className={cn("hourlyPay")}>
            <FilterDropBoxShell.FilterTitle text="금액" />
            <FilterDropBoxShell.HourlyPayInput hourlyPayGte={filter.hourlyPayGte} setFilter={setFilter} />
          </div>
        </FilterDropBoxShell>
      </div>

      {/* 검색 결과 테스트 */}

      {/* 페이지네이션 */}
      <Pagenation
        numberOfTotalData={count}
        limitPerSinglePage={LIMIT_PER_SINGLE_PAGE}
        limitPerPageGroup={LIMIT_PER_PAGE_GROUP}
        dependency={sort.id}
        handleChangeData={handleChangeData}
      />
    </div>
  );
}
