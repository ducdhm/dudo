export default function getQueryString () {
    new URLSearchParams(document.location.search.substring(1));
};
