function bitsToBuffer(bits) {
    const byteCount = Math.ceil(bits.length / 8);
    const buffer = Buffer.alloc(byteCount);

    for (let i = 0; i < bits.length; i++) {
        if (bits[i] === '1') {
            const byteIndex = Math.floor(i / 8);
            const bitOffset = 7 - (i % 8);
            buffer[byteIndex] |= 1 << bitOffset;
        }
    }

    return buffer;
}

const mapToObject = (map) => {
    const obj = {};
    map.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
}

module.exports = {
    bitsToBuffer,
    mapToObject
}

