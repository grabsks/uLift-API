const fs = require('fs');

const toBase64 = file => {
    const bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
};

export const toJson = file => {
    return {
        name: file.name,
        size: file.size,
        body: toBase64(file),
    }
};