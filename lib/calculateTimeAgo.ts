export const calculateTimeAgo = (createdAt: string) => {
  const now = new Date();
  const createdTime = new Date(createdAt);

  const seconds = Math.floor((now.getTime() - createdTime.getTime()) / 1000);
  if (seconds < 60) return "방금 전";

  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;

  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;

  return `${createdTime.toLocaleDateString()}`;
};
