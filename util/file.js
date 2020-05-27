const Blob = require("cross-blob");

const toBlob = file => {
    let buffer = Buffer.from(file.data);
    let arrayBuffer = Uint8Array.from(buffer).buffer;
    return new Blob([arrayBuffer], { type: file.mimetype })
};

export const toJson = file => {
    return {
        name: file.name,
        size: file.size,
        body: toBlob(file),
    }
};