export const getQueryString = () => new URLSearchParams(document.location.search.substring(1));

export default getQueryString;
