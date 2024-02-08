const getPageGroup = (limitPerPageGroup: number, totalPageNumber: number, pageGroupNumber: number) => {
  const startNumberOfPageGroup = (pageGroupNumber - 1) * limitPerPageGroup + 1;
  let lastNumberOfPageGroup = pageGroupNumber * limitPerPageGroup;
  if (totalPageNumber < lastNumberOfPageGroup) {
    lastNumberOfPageGroup = totalPageNumber;
  }
  const newPageGroup = new Array(lastNumberOfPageGroup - startNumberOfPageGroup + 1)
    .fill(0)
    .map((_, i) => startNumberOfPageGroup + i);

  return newPageGroup;
};

export const getCurrentPageGroup = (
  LIMIT_PER_PAGE_GROUP: number,
  totalPageNumber: number,
  currentPageNumber: number = 1
) => {
  const pageGroupNumber = Math.ceil(currentPageNumber / LIMIT_PER_PAGE_GROUP);
  return getPageGroup(LIMIT_PER_PAGE_GROUP, totalPageNumber, pageGroupNumber);
};

export const changePageGroup = (
  type: "previous" | "next",
  limitPerPageGroup: number, // 한 번에 몇 번 페이지까지 보여줄 지
  totalPageNumber: number, // 전체 페이지 개수
  currentPageNumber: number = 1 // 현재 페이지 번호
) => {
  // 현재 페이지 그룹이 몇 번째 그룹인지
  const currentPageGroupNumber = Math.ceil(currentPageNumber / limitPerPageGroup);

  let nextPageGroupNumber;
  switch (type) {
    case "previous":
      nextPageGroupNumber = currentPageGroupNumber - 1;
      break;
    case "next":
      nextPageGroupNumber = currentPageGroupNumber + 1;
      break;
  }

  return getPageGroup(limitPerPageGroup, totalPageNumber, nextPageGroupNumber);
};
