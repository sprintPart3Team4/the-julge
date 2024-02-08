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
  return `${startTime}~${endTime} (${workhour}시간)`;
}

export function getFullDate(sourceDate: string, workhour: number) {
  const date = new Date(sourceDate);

  return `${getDate(date)} ${getTime(date, workhour)}`;
}
