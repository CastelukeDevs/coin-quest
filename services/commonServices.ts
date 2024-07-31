import APICall from "./APIs/APICall";

const searchByString = async (query: string) => {
  return await APICall<ISearchResult>("SEARCH_BY_STRING", {
    params: { query },
  }).then((res) => res.response);
};

export default searchByString;
