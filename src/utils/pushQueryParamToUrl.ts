export function pushQueryParamToUrl(queryKey: string, value: string) {
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set(queryKey, value);
  window.history.pushState({ path: newUrl.href }, '', newUrl.href);
}
