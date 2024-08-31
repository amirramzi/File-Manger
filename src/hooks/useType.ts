const useType = (name: string) => {
  const extension = name.split(".").pop()?.toString();
  console.log("file format :", extension);

  const fileTypes: { [key: string]: string } = {
    jpg: "image",
    jpeg: "image",
    png: "image",
    pdf: "pdf",
    xlsx: "excel",
    txt: "text",
    json: "json",
    html: "html",
    js: "js",
    ts: "js",
    jsx: "jsx",
    tsx: "jsx",
    zip: "archive",
    rar: "archive",
    mp3: "audio",
    mp4: "video",
  };

  return fileTypes[extension || ""] || "unknown";
};

export default useType;
