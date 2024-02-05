import { useEffect, useState } from "react";
import { Filter, NoticeList, getNotices } from "@/lib/getNotices";

export default function Notices() {
  const [isLoading, setIsLoading] = useState(true);
  // 보여 줄 데이터 저장
  const [noticeList, setNoticeList] = useState<NoticeList>();
  // 검색어
  const [keyword, setKeyword] = useState("");
  // 상세필터
  const initailFilter = {
    address: [],
    startsAtGte: "",
    hourlyPayGte: 0,
  };
  const [filter, setFilter] = useState<Filter>(initailFilter);
  // 정렬
  const initailSort = "time";
  const [sort, setSort] = useState(initailSort);
  // 페이지네이션 - 아직 구현 전
  const [count, setCount] = useState(0);
  const LIMIT_PER_SINGLE_PAGE = 30; // 한 페이지에 보여줄 데이터의 개수
  const LIMIT_PER_PAGE_GROUP = 5; // 한 번에 보여줄 페이지 번호의 개수

  useEffect(() => {
    try {
      getNotices(0, LIMIT_PER_SINGLE_PAGE).then(({ count, items }) => {
        setCount(count);
        setNoticeList(items);
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <div>로딩 중</div>;

  // 키워드를 검색하면 정렬, 상세필터, 페이지네이션은 초기화 - 페이지네이션은 아직 구현 전
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    getNotices(0, LIMIT_PER_SINGLE_PAGE, e.target.value).then(({ count, items }) => {
      setCount(count);
      setNoticeList(items);
    });
    setSort(initailSort);
    setFilter(initailFilter);
  };

  // 상세 필터를 적용하면, 키워드는 유지되지만, 정렬, 페이지네이션은 초기화! - 페이지네이션은 아직 구현 전
  // 시간 포맷을 RFC3339로 바꾸는 것도 아직 미적용해서 시간을 보낼 경우 오류가 남.
  const handleFilterButtonClick = () => {
    const { address, startsAtGte, hourlyPayGte } = filter;
    getNotices(0, LIMIT_PER_SINGLE_PAGE, keyword, address, startsAtGte, hourlyPayGte).then(({ count, items }) => {
      setCount(count);
      setNoticeList(items);
    });
    setSort(initailSort);
  };

  // 정렬하면, 저장된 검색어와 상세필터를 유지한 채 API 요청, 페이지네이션은 초기화 - 페이지네이션은 아직 구현 전
  const handleSortButtonClick = (e) => {
    const sort = e.target.value;
    const { address, startsAtGte, hourlyPayGte } = filter;
    getNotices(0, LIMIT_PER_SINGLE_PAGE, keyword, address, startsAtGte, hourlyPayGte, sort).then(({ count, items }) => {
      setCount(count);
      setNoticeList(items);
    });
  };

  return (
    <div>
      {/* 키워드 검색 테스트 */}
      <input type="text" value={keyword} onChange={handleKeywordChange} />
      {/* 정렬 테스트 */}
      <div>
        <span>정렬 sort</span>
        {dropBoxText.map(({ text, value }) => (
          <button key={value} value={value} onClick={handleSortButtonClick}>
            {text}
          </button>
        ))}
      </div>
      {/* 상세필터 - 위치 테스트 */}
      <div>
        <div>주소 선택</div>
        {address.map((address) => (
          <button
            key={address}
            value={address}
            onClick={() => {
              setFilter((prev) => ({ ...prev, address: [...prev.address, address] }));
            }}
          >
            {address}
          </button>
        ))}
        <div>
          <span>선택된 주소</span>
          <span>
            {filter?.address?.map((add) => (
              <div key={add}>
                <span>{add}</span>
                <button
                  onClick={() => {
                    setFilter((prev) => ({ ...prev, address: prev.address?.filter((value) => value !== add) }));
                  }}
                >
                  x
                </button>
              </div>
            ))}
          </span>
        </div>
      </div>
      {/* 시작일 테스트 */}
      <input
        type="datetime-local"
        value={filter.startsAtGte}
        placeholder="입력"
        onChange={(e) => {
          const date = new Date(e.target.value).toISOString();
          setFilter((prev) => ({ ...prev, startsAtGte: date }));
        }}
      />
      {/* 금액 테스트 */}
      <div>
        <input
          type="number"
          value={filter.hourlyPayGte}
          onChange={(e) => setFilter((prev) => ({ ...prev, hourlyPayGte: Number(e.target.value) }))}
        />
        <span>원 이상부터</span>
      </div>
      {/* 상세 필터 적용 버튼 */}
      <div>
        <button onClick={handleFilterButtonClick}>API 테스트 버튼</button>
      </div>
      <div>
        {noticeList?.map(
          ({
            item: {
              id,
              hourlyPay,
              startsAt,
              workhour,
              shop: {
                item: { name, address1 },
              },
            },
          }) => (
            <div key={id}>
              <span>{`시급 ${hourlyPay}`}</span>
              <span>{`시작날짜 ${startsAt}`}</span>
              <span>{`일하는 시간 ${workhour}`}</span>
              <span>{`식당이름 ${name}`}</span>
              <span>{`주소 ${address1}`}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

const dropBoxText = [
  { text: "마감 임박 순", value: "time" },
  { text: "시급 많은 순", value: "pay" },
  { text: "시간 적은 순", value: "hour" },
  { text: "가나다순", value: "shop" },
];

const address = [
  "서울시 종로구",
  "서울시 중구",
  "서울시 용산구",
  "서울시 성동구",
  "서울시 광진구",
  "서울시 동대문구",
  "서울시 중랑구",
  "서울시 성북구",
  "서울시 강북구",
  "서울시 도봉구",
  "서울시 노원구",
  "서울시 은평구",
  "서울시 서대문구",
  "서울시 마포구",
  "서울시 양천구",
  "서울시 강서구",
  "서울시 구로구",
  "서울시 금천구",
  "서울시 영등포구",
  "서울시 동작구",
  "서울시 관악구",
  "서울시 서초구",
  "서울시 강남구",
  "서울시 송파구",
  "서울시 강동구",
];
