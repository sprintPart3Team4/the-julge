const OFFSET = 1000 * 60 * 60 * 9;

function getDate(date: Date) {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getTime(date: Date, workhour: number) {
  const hour = date.getHours();
  const endHour = hour + workhour > 24 ? hour + workhour - 24 : hour + workhour;
  const minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

  const startTime = `${hour}:${minute}`;
  const endTime = `${endHour}:${minute}`;

  return `${startTime}~${endTime}`;
}

// 2024-02-14 13:00~18:00 (5시간)
export function getFullDate(sourceDate: string, workhour: number) {
  const date = new Date(new Date(sourceDate).getTime() - OFFSET);
  const workhourNumber = workhour * 1;

  return `${getDate(date)} ${getTime(date, workhourNumber)} (${workhourNumber}시간)`;
}

// 2024-02-14 13:00~18:00
export function getWorkingDate(sourceDate: string, workhour: number) {
  const date = new Date(new Date(sourceDate).getTime() - OFFSET);
  const workhourNumber = workhour * 1;

  return `${getDate(date)} ${getTime(date, workhourNumber)}`;
}

export function getToday() {
  const date = new Date(new Date().getTime() + OFFSET).toISOString();

  return date;
}

export function getLocalTime(startsAt: string) {
  const date = new Date(new Date(startsAt).getTime() + OFFSET).toISOString();
  return date;
}
