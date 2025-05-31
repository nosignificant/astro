export default function generateHref (
  pathname: string,
  searchParams: string,
  documentId: string
) {
  const newParams = new URLSearchParams(searchParams.toString());

  if (pathname !== documentId) {
    return `/bulletin/${documentId}?${newParams.toString()}`;
  } else {
    return `/bulletin/?${newParams.toString()}`;
  }
}