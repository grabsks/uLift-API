const Blob = require("cross-blob");

const toBlob = (file) => {
  const buffer = Buffer.from(file.data);
  const arrayBuffer = Uint8Array.from(buffer).buffer;
  return new Blob([arrayBuffer], { type: file.mimetype });
};

const toJson = (file) => {
  return {
    name: file.name,
    size: file.size,
    body: toBlob(file),
  };
};

export default toJson;
