import blobUrlToBlob from './blobUrlToBlob';

async function blobUrlToFile(blobUrl, filename) {
  const blob = await blobUrlToBlob(blobUrl);
  const file = new File([blob], filename, { type: blob.type });
  return file;
}

export default blobUrlToFile; 