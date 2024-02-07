export default function getCookies() {
  const cookies = Object.fromEntries(document.cookie.split(";").map((cookie) => cookie.trim().split("=")));
  return cookies;
}

export function getReqCookies(reqCookies: string) {
  const cookies = Object.fromEntries(reqCookies.split(";").map((cookie) => cookie.trim().split("=")));
  return cookies;
}
