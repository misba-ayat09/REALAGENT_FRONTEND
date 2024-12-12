/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function downloadFile(data: any, filename: string, mime?: string, bom?: any): void {
  const blob = createBlob(data, mime, bom);
  if (isInternetExplorer()) {
    saveBlobInInternetExplorer(blob, filename);
  } else {
    const blobURL = createObjectURL(blob);
    const tempLink = createTempLink(blobURL, filename);
    document.body.appendChild(tempLink);
    tempLink.click();
    cleanupTempLink(tempLink, blobURL);
  }
}

export async function downloadFileV1(
 data:any,
 fileName :string,
) {

  
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('target', '_blank');
  link.setAttribute('download', fileName); //or any other extension
  document.body.appendChild(link);
  link.click();
}


function createBlob(data: any, mime?: string, bom?: any): Blob {
  const blobData = typeof bom !== "undefined" ? [bom, data] : [data];
  return new Blob(blobData, { type: mime || "application/octet-stream" });
}

function isInternetExplorer(): boolean {
  return (
    navigator.userAgent.indexOf("MSIE") !== -1 || !!navigator.userAgent.match(/Trident.*rv:11\./)
  );
}

function saveBlobInInternetExplorer(blob: Blob, filename: string): void {
  if ((navigator as any).msSaveBlob !== undefined) {
    (navigator as any).msSaveBlob(blob, filename);
  } else {
    console.error("Unsupported browser for saving blob in Internet Explorer.");
  }
}

function createObjectURL(blob: Blob): string {
  return window.URL && window.URL.createObjectURL
    ? window.URL.createObjectURL(blob)
    : window.webkitURL.createObjectURL(blob);
}

function createTempLink(blobURL: string, filename: string): HTMLAnchorElement {
  const tempLink = document.createElement("a");
  tempLink.style.display = "none";
  tempLink.href = blobURL;
  tempLink.setAttribute("download", filename);
  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank");
  }
  return tempLink;
}

function cleanupTempLink(tempLink: HTMLAnchorElement, blobURL: string): void {
  setTimeout(() => {
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }, 200);
}
