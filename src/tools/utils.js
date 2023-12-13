const bitsToBuffer = (bits) => {
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

const bufferToBits = (buffer) => {
    let bits = '';

    for (let i = 0; i < buffer.length; i++) {
        for (let j = 7; j >= 0; j--) {
            bits += (buffer[i] & (1 << j)) ? '1' : '0';
        }
    }

    return bits;
}

const mapToObject = (map) => {
    const obj = {};
    map.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
}

const objectToMap = (obj) => {
    const map = new Map();
    Object.entries(obj).forEach(([key, value]) => {
        map.set(key, value);
    });
    return map;
}

/**
 * Cases for string: 'true', 'false', '1', '0'
 * @param {*} string 
 * @returns boolean
 */
const stringToBoolean = (string) => {
    if (typeof string !== 'string') {
        throw new Error('Argument must be a string');
    }
    if (string !== 'true' && string !== 'false' && string !== '1' && string !== '0') {
        throw new Error('Argument must be a string: "true", "false", "1", "0"');
    }

    return string === 'true' || string === '1';
}

module.exports = {
    bitsToBuffer,
    bufferToBits,
    mapToObject,
    objectToMap,
    stringToBoolean
}

