import EndpointPool from "./EndpointPool";

enum EndpointMethod {
  get,
  post,
  delete,
  put,
}

export type IEndpointMethod = keyof typeof EndpointMethod;

export type IEndpointPool = {
  endpoint: string;
  url: string;
  method: IEndpointMethod;
  auth?: boolean;
  form?: boolean;
  header?: any;
};

export type IEndpoint = (typeof EndpointPool)[number]["endpoint"];

export const getEndpoint = (endpoint: IEndpoint): IEndpointPool | undefined => {
  return EndpointPool.find((item) => item.endpoint === endpoint);
};

export type ICancelSignal = {
  abortController?: AbortController;
};

export type IUrlParam = { [key: string]: string };

export type IAPIsCallOption<T = never> = {
  params?: any;
  urlParams?: any;
  data?: T | FormData;
  auth?: boolean;
  isDataForm?: boolean;
  header?: any;
} & ICancelSignal;

export type IAPIsReturn<T> = {
  message: string;
  code: string | number;
  response: T;
};
export type IAPIsReturnError<T> = {
  message: string;
  code: string | number;
  error: T;
};

export type IAPIError = { message: string; status: number; error: any };

/**
 * Remove empty element in an object
 *
 * @param obj
 * @returns obj
 */
export const removeEmptyElement = (obj: any): any => {
  if (obj === undefined || obj === null) return undefined;
  const o = Object.keys(obj)
    .filter((k) => obj[k] != null)
    .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});

  return o;
};

/**
 * Convert json/object payload into FormData
 *
 * @param object
 * @returns FormData
 */
export const transformObjectToForm = (object: any): FormData => {
  if (object === null || object === undefined) return object;
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    const objValue = object[key];
    if (objValue === undefined || objValue === null) return;
    if (Array.isArray(objValue)) {
      objValue.forEach((v, i) => {
        Object.keys(v).forEach((arrKey) => {
          if (v[arrKey] === undefined || v[arrKey] === null) return;
          formData.append(`${key}[${i}][${arrKey}]`, v[arrKey]);
        });
      });
    } else {
      formData.append(key, object[key]);
    }
  });
  return formData;
};

/**
 * Replace ":paramName" in url into param value
 *
 * unknown / mismatch :paramName in url will not replaced.
 *
 * @param url string
 * @param param object
 * @returns string url
 */
export const getURLWithParam = (url: string, param?: any): string => {
  const urlSplit = url.split("/");
  if (param === undefined || urlSplit.length <= 1 || typeof param !== "object")
    return url;
  Object.keys(param).forEach((paramKey) => {
    if (!urlSplit.includes(":" + paramKey)) return;
    const stringIndex = urlSplit.findIndex((str) => str === ":" + paramKey);
    if (stringIndex >= 0) {
      urlSplit[stringIndex] = param[paramKey];
    }
  });
  return urlSplit.join("/");
};
