export const userInfo = {
  item: {
    id: "e4b00e47-e271-4ad8-92f2-bc663b1b8a16",
    email: "dobby@codeit.com",
    type: "employee",
    name: "도비",
    phone: "010-0000-0000",
    address: "서울시 종로구",
    bio: "언제든 일할 준비가 되어 있습니다.  항상 모든 일에 근면성실하게 임하겠습니다. 당신이 양말을 주시기 전까지..",
    shop: null,
  },
  links: [
    {
      rel: "self",
      description: "사용자 정보",
      method: "GET",
      href: "/api/2-4/the-julge/users/e4b00e47-e271-4ad8-92f2-bc663b1b8a16",
    },
    {
      rel: "update",
      description: "사용자 정보 수정",
      method: "PUT",
      href: "/api/2-4/the-julge/users/e4b00e47-e271-4ad8-92f2-bc663b1b8a16",
      body: {
        name: "string",
        phone: "string",
        address:
          "서울시 종로구 | 서울시 중구 | 서울시 용산구 | 서울시 성동구 | 서울시 광진구 | 서울시 동대문구 | 서울시 중랑구 | 서울시 성북구 | 서울시 강북구 | 서울시 도봉구 | 서울시 노원구 | 서울시 은평구 | 서울시 서대문구 | 서울시 마포구 | 서울시 양천구 | 서울시 강서구 | 서울시 구로구 | 서울시 금천구 | 서울시 영등포구 | 서울시 동작구 | 서울시 관악구 | 서울시 서초구 | 서울시 강남구 | 서울시 송파구 | 서울시 강동구",
        bio: "string",
      },
    },
    {
      rel: "applications",
      description: "지원 목록",
      method: "GET",
      href: "/api/2-4/the-julge/users/e4b00e47-e271-4ad8-92f2-bc663b1b8a16/applications",
      query: {
        offset: "undefined | number",
        limit: "undefined | number",
      },
    },
    {
      rel: "alerts",
      description: "알림 목록",
      method: "GET",
      href: "/api/2-4/the-julge/users/e4b00e47-e271-4ad8-92f2-bc663b1b8a16/alerts",
    },
  ],
};
