import cookie from "js-cookie";
// import moment from "moment";

class CookieUtils {
  static setCookie = (key, value) => {
    // const nowDate = moment(Date.now());
    // const toDate = moment(expDate);
    // const diffDays = toDate.diff(nowDate, "days") + 1;
    // const expDate = 4000;
    cookie.set(key, value, {
      // expires: diffDays,
      //expires: Math.floor(Number(expDate) / (1000 * 3600 * 24))
      expires: 86400000
    });
  };

  getCookie(key, req = {}) {
    return process.browser
      ? this.getCookieFromBrowser(key)
      : this.getCookieFromServer(key, req);
  }

  static removeCookie = key => {
    cookie.remove(key);
  };

  getCookieFromBrowser(key) {
    return cookie.get(key);
  }

  getCookieFromServer(key, req) {
    if (!req.headers) return;
    const { cookie } = req.headers;

    if (!cookie) return undefined;

    const rawCookie = cookie
      .split(";")
      .find(cookie => cookie.trim().startsWith(`${key}=`));
    if (!rawCookie) return undefined;

    return rawCookie.split("=")[1];
  }
}

export default CookieUtils;
