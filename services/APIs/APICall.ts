import axios, { AxiosError } from "axios";

import {
  IAPIError,
  IAPIsCallOption,
  IEndpoint,
  transformObjectToForm,
  getEndpoint,
  removeEmptyElement,
  getURLWithParam,
  IEndpointPool,
  IAPIsReturn,
} from "./APIUtils";
import { retrieveToken } from "../tokenManager";

/**
 * Endpoint Caller services function
 *
 * Note: urlParams accepts "/:params/"
 * @type <ResponseType,DataType>
 * @param endpoint IEndpoint | IEndpointPool
 * @param options IAPIsCallOption
 * @returns
 *
 * @example
 * async ()=> await APICall("IEndpoint",{
 *    params: {param1: "string"},
 *    urlParams:{urlParams: "string"},
 *    data: {data1: "string"},
 *    data: {data1: "string"},
 *    auth: true,
 *    isDataForm: false,
 *    abortController: undefined
 *  })
 */
const APICall = async <T, X = never>(
  endpoint: IEndpoint | IEndpointPool,
  options?: IAPIsCallOption<X>
) => {
  const apiUrl = process.env.API_URL ?? process.env.LOCAL_API_URL;
  axios.defaults.baseURL = apiUrl;

  const token = await retrieveToken();
  const selectEndpoint =
    typeof endpoint === "string" ? getEndpoint(endpoint)! : endpoint;
  const isDataTypeForm = options?.data instanceof FormData;
  const isFormDataExpected =
    isDataTypeForm || options?.isDataForm || selectEndpoint.form;

  if (selectEndpoint === undefined) {
    console.log(
      `=> [X] New API Call ${endpoint} endpoint not found //message: ${endpoint}`
    );
    const errorPayload = {
      message: "Endpoint missing",
      code: `500`,
      response: undefined,
    };

    throw errorPayload;
  }

  if (typeof endpoint !== "string") {
    endpoint.url.replace(apiUrl ?? "", "");
  }

  const dataPayload = options?.data
    ? removeEmptyElement(options?.data)
    : undefined;

  const headerContentType = isFormDataExpected
    ? { "Content-Type": "multipart/form-data" }
    : undefined;

  const payloadData =
    isFormDataExpected && !isDataTypeForm
      ? transformObjectToForm(dataPayload)
      : dataPayload;

  console.log(
    `=> [${selectEndpoint.method.toUpperCase()}] New API Call ${
      selectEndpoint.endpoint
    } with detail:`,
    {
      endpoint: selectEndpoint,
      options,
      payloadData,
      headerContentType,
      token,
    }
  );

  return await axios({
    method: selectEndpoint.method,
    url: getURLWithParam(selectEndpoint.url, options?.urlParams),
    data: payloadData,
    params: options?.params ? options?.params : undefined,
    signal: options?.abortController?.signal,
    headers: {
      // ...headerAuthorization,
      ...headerContentType,
      ...options?.header,
      ...selectEndpoint.header,
      Accept: "application/json",
    },
  })
    .then((result) => {
      console.log(
        `=> [O] axios request ${selectEndpoint.endpoint} success`,
        result
      );
      const resultPayload: IAPIsReturn<T> = {
        message: "success",
        code: `${result.status}`,
        response: result.data,
      };
      return resultPayload;
    })
    .catch((error: AxiosError<IAPIError>) => {
      console.warn("=> [X] axios error:", error);

      // const errorPayload = {
      //   message: error.message ?? "unknown error",
      //   code: `${error.response?.status}`,
      //   error: error.response,
      // };
      // console.log(
      //   `=> [X] axios request ${selectEndpoint.endpoint} error with code: ${errorPayload.code} //message: ${errorPayload.message}`
      // );

      throw error;
    });
};

export default APICall;
