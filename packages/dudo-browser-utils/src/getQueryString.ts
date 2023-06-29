export default function getQueryString(): URLSearchParams {
  return new URLSearchParams(document.location.search.substring(1))
};
