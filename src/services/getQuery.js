const getQuery = (queryStr, queryName) =>
  Number.parseInt(new URLSearchParams(queryStr).get(queryName), 10);

export default getQuery;
