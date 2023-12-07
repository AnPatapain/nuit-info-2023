async function blobUrlToBlob(blobUrl) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return blob;
}

export default blobUrlToBlob;