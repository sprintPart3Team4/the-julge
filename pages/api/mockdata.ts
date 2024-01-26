// 가게 정보 상세 페이지 UI 구현을 위해 임시로 넣어둔 목데이터입니다
// api 구현 되면 지우겠습니다
// - 지선

export const storeInfo = {
  item: {
    id: "1",
    name: "도토리 식당",
    category: "식당",
    address1: "서울시 송파구",
    address2: "서울시 송파구",
    description: "알바하기 편한 너구리네 라면집!\n 라면 올려두고 끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다.",
    imageUrl: "string",
    originalHourlyPay: "15000",
    user: {
      item: {
        id: "1",
        email: "store@store.com",
        type: "employer",
        name: "김주인", // optional
        phone: "010-0000-0000", // optional
        address: "서울시 강남구", // optional
        bio: "식당 오너임 ㅋㅎㅋ", // optional
      },
      href: "string",
    },
  },
  links: "https://codeit.notion.site/API-10a715ce7c2240fd9d16aa47b5a6bc34",
};

export const noticeList = {
  offset: 1,
  limit: 5,
  count: 5, // 전체 개수
  hasNext: true, // 다음 내용 존재 여부
  items: [
    {
      item: {
        id: "1",
        hourlyPay: 15000,
        startsAt: "2023-06-02",
        workhour: 3,
        description: "공고목록 디스크립션",
        closed: "true",
      },
      links: "https://codeit.notion.site/API-10a715ce7c2240fd9d16aa47b5a6bc34",
    },
  ],
  links: "https://codeit.notion.site/API-10a715ce7c2240fd9d16aa47b5a6bc34",
};
