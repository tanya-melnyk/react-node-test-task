const getQuery = (queryStr, queryName) =>
  new URLSearchParams(queryStr).get(queryName);

export default getQuery;
