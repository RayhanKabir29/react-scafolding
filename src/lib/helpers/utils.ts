/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serialize } from "object-to-formdata";

export const capitalize=(str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const filterFalsyValues = (obj: any) => {
  const newObj: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value) {
      newObj[key] = value;
    }
  }
  return newObj;
};
export const commaRemover = (value: string) => {
  return value.replace(/\,/g, "");
};
export const refreshPage = (url: string, callback?: any) => {
  setTimeout(() => {
    callback();
    window.location.replace(url);
  }, 1000);
};
export const humanize = (str: string) => {
  let humanizedStr = "";
  if (str) {
    humanizedStr = str
      .replace(/^[\s_]+|[\s_]+$/g, "")
      .replace(/[_\s]+/g, " ")
      .replace(/^[a-z]/, function (m) {
        return m.toUpperCase();
      });
  }
  return humanizedStr;
};

export const objectToFormData = (obj: any) => {
  return serialize(obj);
};